import { AlertCircle, CheckCircle, Info, Package } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  engines: Record<string, string>;
  repository: any;
  keywords: string[];
  main: string;
  type: string;
}

export default function PackageJsonAnalyzerPage() {
  const [input, setInput] = useState("");
  const [packageInfo, setPackageInfo] = useState<PackageInfo | null>(null);
  const [error, setError] = useState("");
  const [issues, setIssues] = useState<string[]>([]);

  const analyze = () => {
    setError("");
    setIssues([]);
    setPackageInfo(null);

    if (!input.trim()) {
      setError("Please enter package.json content");
      return;
    }

    try {
      const pkg = JSON.parse(input);
      const foundIssues: string[] = [];

      // Check for common issues
      if (!pkg.name) foundIssues.push("Missing 'name' field");
      if (!pkg.version) foundIssues.push("Missing 'version' field");
      if (!pkg.description) foundIssues.push("Missing 'description' field (recommended)");
      if (!pkg.license) foundIssues.push("Missing 'license' field (recommended)");
      if (!pkg.repository) foundIssues.push("Missing 'repository' field (recommended)");

      // Check version format
      if (pkg.version && !/^\d+\.\d+\.\d+/.test(pkg.version)) {
        foundIssues.push("Version should follow semver format (x.y.z)");
      }

      // Check for duplicate dependencies
      if (pkg.dependencies && pkg.devDependencies) {
        const deps = Object.keys(pkg.dependencies);
        const devDeps = Object.keys(pkg.devDependencies);
        const duplicates = deps.filter((d) => devDeps.includes(d));
        if (duplicates.length > 0) {
          foundIssues.push(`Duplicate dependencies: ${duplicates.join(", ")}`);
        }
      }

      // Check for deprecated fields
      if (pkg.preferGlobal) foundIssues.push("'preferGlobal' is deprecated");

      setIssues(foundIssues);
      setPackageInfo({
        name: pkg.name || "N/A",
        version: pkg.version || "N/A",
        description: pkg.description || "N/A",
        author: pkg.author || "N/A",
        license: pkg.license || "N/A",
        dependencies: pkg.dependencies || {},
        devDependencies: pkg.devDependencies || {},
        scripts: pkg.scripts || {},
        engines: pkg.engines || {},
        repository: pkg.repository,
        keywords: pkg.keywords || [],
        main: pkg.main || "N/A",
        type: pkg.type || "commonjs",
      });
    } catch (err) {
      setError("Invalid JSON: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const examplePackage = {
    name: "my-awesome-app",
    version: "1.0.0",
    description: "An awesome application",
    main: "index.js",
    type: "module",
    scripts: {
      start: "node index.js",
      test: "jest",
      build: "tsc",
      dev: "nodemon index.js",
    },
    keywords: ["awesome", "app", "example"],
    author: "John Doe <john@example.com>",
    license: "MIT",
    dependencies: {
      express: "^4.18.2",
      dotenv: "^16.0.3",
    },
    devDependencies: {
      jest: "^29.5.0",
      typescript: "^5.0.4",
      nodemon: "^2.0.22",
    },
    engines: {
      node: ">=18.0.0",
      npm: ">=9.0.0",
    },
    repository: {
      type: "git",
      url: "https://github.com/user/repo.git",
    },
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Package.json Analyzer</h1>
        <p className="text-muted-foreground">Analyze and validate your Node.js package.json file</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Input
            </CardTitle>
            <CardDescription>Paste your package.json content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                analyze();
              }}
              placeholder='{"name": "my-app", ...}'
              className="font-mono text-xs min-h-[400px]"
            />
            <button
              onClick={() => setInput(JSON.stringify(examplePackage, null, 2))}
              className="text-sm text-primary hover:underline"
            >
              Load example
            </button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {packageInfo && (
            <>
              {issues.length > 0 && (
                <Card className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <Info className="h-5 w-5" />
                      Issues Found ({issues.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {issues.map((issue, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {issues.length === 0 && (
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">No issues found! Package looks good.</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Package Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-muted-foreground">Name:</div>
                      <div className="font-semibold">{packageInfo.name}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Version:</div>
                      <div className="font-semibold">{packageInfo.version}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">License:</div>
                      <div className="font-semibold">{packageInfo.license}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Type:</div>
                      <div className="font-semibold">{packageInfo.type}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Description:</div>
                    <div>{packageInfo.description}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Author:</div>
                    <div>{packageInfo.author}</div>
                  </div>
                  {packageInfo.keywords.length > 0 && (
                    <div>
                      <div className="text-muted-foreground mb-2">Keywords:</div>
                      <div className="flex flex-wrap gap-2">
                        {packageInfo.keywords.map((kw, idx) => (
                          <Badge key={idx} variant="secondary">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dependencies</CardTitle>
                    <CardDescription>{Object.keys(packageInfo.dependencies).length} packages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(packageInfo.dependencies).length > 0 ? (
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {Object.entries(packageInfo.dependencies).map(([name, version]) => (
                          <div key={name} className="flex justify-between text-sm">
                            <span className="font-mono">{name}</span>
                            <span className="text-muted-foreground">{version}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No dependencies</div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dev Dependencies</CardTitle>
                    <CardDescription>{Object.keys(packageInfo.devDependencies).length} packages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(packageInfo.devDependencies).length > 0 ? (
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {Object.entries(packageInfo.devDependencies).map(([name, version]) => (
                          <div key={name} className="flex justify-between text-sm">
                            <span className="font-mono">{name}</span>
                            <span className="text-muted-foreground">{version}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No dev dependencies</div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {Object.keys(packageInfo.scripts).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Scripts</CardTitle>
                    <CardDescription>{Object.keys(packageInfo.scripts).length} script(s)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(packageInfo.scripts).map(([name, command]) => (
                        <div key={name} className="border-l-2 border-primary pl-3">
                          <div className="font-semibold text-sm">{name}</div>
                          <div className="text-xs font-mono text-muted-foreground">{command}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {Object.keys(packageInfo.engines).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Engine Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {Object.entries(packageInfo.engines).map(([engine, version]) => (
                        <div key={engine} className="flex justify-between">
                          <span className="font-semibold">{engine}:</span>
                          <span className="font-mono">{version}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Package.json</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            The package.json file is the heart of any Node.js project. It contains metadata about the project,
            dependencies, scripts, and configuration.
          </p>
          <div>
            <strong>Required fields:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>name:</strong> Package name (lowercase, no spaces)
              </li>
              <li>
                <strong>version:</strong> Semantic version (x.y.z)
              </li>
            </ul>
          </div>
          <div>
            <strong>Recommended fields:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>description:</strong> Brief package description
              </li>
              <li>
                <strong>license:</strong> License type (MIT, ISC, etc.)
              </li>
              <li>
                <strong>repository:</strong> Git repository URL
              </li>
              <li>
                <strong>keywords:</strong> Searchable keywords for npm
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
