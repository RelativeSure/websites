import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check, Search } from "lucide-react";

export default function JsonPathTesterPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonPath, setJsonPath] = useState("$.store.book[*].author");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Simple JSONPath evaluator (supports basic queries)
  const evaluateJsonPath = (obj: any, path: string): any => {
    // Remove leading $
    path = path.replace(/^\$\.?/, "");

    if (!path) return obj;

    const parts = path.split(/\.|\[/);
    let current = obj;

    for (let part of parts) {
      if (!part) continue;

      // Handle array index [0]
      if (part.endsWith("]")) {
        const index = part.replace("]", "");

        // Wildcard [*]
        if (index === "*") {
          if (!Array.isArray(current)) {
            throw new Error("Cannot use [*] on non-array");
          }
          return current;
        }

        // Numeric index
        const numIndex = parseInt(index);
        if (!isNaN(numIndex)) {
          current = current[numIndex];
        }
      } else {
        // Regular property access
        if (current === null || current === undefined) {
          throw new Error(`Cannot read property '${part}' of ${current}`);
        }
        current = current[part];
      }
    }

    return current;
  };

  const testPath = () => {
    try {
      if (!jsonInput.trim()) {
        setError("Please enter JSON data");
        return;
      }

      const parsed = JSON.parse(jsonInput);
      const pathResult = evaluateJsonPath(parsed, jsonPath);

      setResult(JSON.stringify(pathResult, null, 2));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Evaluation failed");
      setResult("");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exampleJson = `{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`;

  const examplePaths = [
    { path: "$.store.book[0].title", desc: "First book title" },
    { path: "$.store.book[*].author", desc: "All authors" },
    { path: "$.store.bicycle.color", desc: "Bicycle color" },
    { path: "$.store.book[1].price", desc: "Second book price" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON Path Tester</h1>
        <p className="text-muted-foreground">
          Test JSONPath expressions on your JSON data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Data</CardTitle>
            <CardDescription>Enter your JSON to query</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON here..."
              className="min-h-[400px] font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJsonInput(exampleJson)}
              className="w-full"
            >
              Load Example JSON
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>Matched data from your query</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={result}
              readOnly
              placeholder="Result will appear here..."
              className="min-h-[400px] font-mono text-sm bg-muted"
            />
            {result && (
              <Button variant="outline" size="sm" onClick={handleCopy} className="w-full">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Result
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            JSONPath Expression
          </CardTitle>
          <CardDescription>
            Enter a JSONPath expression to query your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json-path">Path Expression</Label>
            <Input
              id="json-path"
              value={jsonPath}
              onChange={(e) => setJsonPath(e.target.value)}
              placeholder="$.store.book[*].author"
              className="font-mono text-lg"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-300">
              <strong>Error:</strong> {error}
            </div>
          )}

          <Button onClick={testPath} className="w-full" size="lg">
            <Search className="mr-2 h-4 w-4" />
            Test Path
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Example Paths</CardTitle>
          <CardDescription>Click to try these examples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePaths.map((ex, i) => (
              <button
                key={i}
                onClick={() => setJsonPath(ex.path)}
                className="p-3 text-left border rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-mono text-sm font-semibold mb-1">{ex.path}</div>
                <div className="text-xs text-muted-foreground">{ex.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>JSONPath Syntax Guide</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Basic Operators</h4>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>$</code>
                <span className="text-muted-foreground">Root object</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>.</code>
                <span className="text-muted-foreground">Property access</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>[n]</code>
                <span className="text-muted-foreground">Array index</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <code>[*]</code>
                <span className="text-muted-foreground">All elements</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Examples</h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2 bg-muted rounded">
                <div className="font-semibold">$.store.book[0]</div>
                <div className="text-muted-foreground">First book</div>
              </div>
              <div className="p-2 bg-muted rounded">
                <div className="font-semibold">$.store.book[*].title</div>
                <div className="text-muted-foreground">All book titles</div>
              </div>
              <div className="p-2 bg-muted rounded">
                <div className="font-semibold">$.store.bicycle.price</div>
                <div className="text-muted-foreground">Bicycle price</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
