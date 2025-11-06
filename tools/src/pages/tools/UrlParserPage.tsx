import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";

export default function UrlParser() {
  const [url, setUrl] = useState("https://user:pass@subdomain.example.com:8080/path/to/page?name=value&foo=bar%20baz#section");
  const [parsed, setParsed] = useState<any>(null);
  const [params, setParams] = useState<[string, string, string][]>([]);

  // Builder state
  const [protocol, setProtocol] = useState("https:");
  const [hostname, setHostname] = useState("example.com");
  const [port, setPort] = useState("");
  const [pathname, setPathname] = useState("/path");
  const [search, setSearch] = useState("?key=value");
  const [hash, setHash] = useState("#section");
  const [builtUrl, setBuiltUrl] = useState("");

  const parseUrl = (urlString: string) => {
    setUrl(urlString);

    if (!urlString.trim()) {
      setParsed(null);
      setParams([]);
      return;
    }

    try {
      const urlObj = new URL(urlString);

      // Extract subdomain
      const hostParts = urlObj.hostname.split(".");
      let subdomain = "";
      if (hostParts.length > 2) {
        subdomain = hostParts.slice(0, -2).join(".");
      }

      setParsed({
        protocol: urlObj.protocol,
        username: urlObj.username,
        password: urlObj.password,
        hostname: urlObj.hostname,
        subdomain: subdomain,
        domain: hostParts.slice(-2).join("."),
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin,
        href: urlObj.href,
      });

      const paramArray: [string, string, string][] = [];
      urlObj.searchParams.forEach((value, key) => {
        paramArray.push([key, value, decodeURIComponent(value)]);
      });
      setParams(paramArray);
    } catch (err) {
      setParsed({ error: "Invalid URL" });
      setParams([]);
    }
  };

  const buildUrl = () => {
    try {
      let urlStr = protocol + "//" + hostname;
      if (port) urlStr += ":" + port;
      urlStr += pathname;
      if (search && !search.startsWith("?")) urlStr += "?" + search;
      else if (search) urlStr += search;
      if (hash && !hash.startsWith("#")) urlStr += "#" + hash;
      else if (hash) urlStr += hash;

      // Validate by parsing
      new URL(urlStr);
      setBuiltUrl(urlStr);
      setUrl(urlStr);
      parseUrl(urlStr);
    } catch (err) {
      setBuiltUrl("Error: Invalid URL components");
    }
  };

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="p-2 bg-muted rounded font-mono text-sm break-all">
        {value || <span className="text-muted-foreground italic">empty</span>}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">URL Parser & Builder</h1>
        <p className="text-muted-foreground">
          Parse, build, and validate URLs
        </p>
      </div>

      <Tabs defaultValue="parser" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parser">Parser</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="parser">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>URL Input</CardTitle>
                  <CardDescription>Enter a URL to parse and analyze</CardDescription>
                </div>
                {url && (
                  <div className="flex items-center gap-2">
                    {validateUrl(url) ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Valid</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-destructive">
                        <XCircle className="h-4 w-4" />
                        <span className="text-xs">Invalid</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => parseUrl(e.target.value)}
                placeholder="https://example.com/path?query=value"
                className="font-mono"
              />
            </CardContent>
          </Card>

          {parsed && !parsed.error && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>URL Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoRow label="Protocol" value={parsed.protocol} />
                    <InfoRow label="Hostname" value={parsed.hostname} />
                    <InfoRow label="Subdomain" value={parsed.subdomain} />
                    <InfoRow label="Domain" value={parsed.domain} />
                    <InfoRow label="Port" value={parsed.port} />
                    <InfoRow label="Origin" value={parsed.origin} />
                  </div>

                  {(parsed.username || parsed.password) && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <InfoRow label="Username" value={parsed.username} />
                      <InfoRow label="Password" value={parsed.password} />
                    </div>
                  )}

                  <InfoRow label="Pathname" value={parsed.pathname} />
                  <InfoRow label="Search/Query" value={parsed.search} />
                  <InfoRow label="Hash/Fragment" value={parsed.hash} />
                  <InfoRow label="Full URL" value={parsed.href} />
                </CardContent>
              </Card>

              {params.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Query Parameters</CardTitle>
                    <CardDescription>{params.length} parameter(s) found</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {params.map(([key, encoded, decoded], i) => (
                        <div key={i} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                          <div className="font-mono text-sm font-bold">{key}</div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Encoded</Label>
                            <div className="p-2 bg-background rounded font-mono text-xs break-all">
                              {encoded}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Decoded</Label>
                            <div className="p-2 bg-primary/10 rounded font-mono text-xs break-all">
                              {decoded}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {parsed?.error && (
            <Card>
              <CardContent className="p-6">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-destructive">{parsed.error}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="builder">
          <Card>
            <CardHeader>
              <CardTitle>Build URL</CardTitle>
              <CardDescription>Construct a URL from its components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <Input
                    id="protocol"
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value)}
                    placeholder="https:"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hostname">Hostname</Label>
                  <Input
                    id="hostname"
                    value={hostname}
                    onChange={(e) => setHostname(e.target.value)}
                    placeholder="example.com"
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">Port (optional)</Label>
                <Input
                  id="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="8080"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pathname">Pathname</Label>
                <Input
                  id="pathname"
                  value={pathname}
                  onChange={(e) => setPathname(e.target.value)}
                  placeholder="/path/to/page"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="search">Query String (optional)</Label>
                <Input
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="?key=value&foo=bar"
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hash">Hash/Fragment (optional)</Label>
                <Input
                  id="hash"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="#section"
                  className="font-mono"
                />
              </div>

              <Button onClick={buildUrl} className="w-full">
                Build URL
              </Button>

              {builtUrl && (
                <div className="space-y-2">
                  <Label>Built URL</Label>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono text-sm break-all">{builtUrl}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
