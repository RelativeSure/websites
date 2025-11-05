import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UrlParser() {
  const [url, setUrl] = useState("https://example.com:8080/path/to/page?name=value&foo=bar#section");
  const [parsed, setParsed] = useState<any>(null);
  const [params, setParams] = useState<[string, string][]>([]);

  const parseUrl = (urlString: string) => {
    setUrl(urlString);

    if (!urlString.trim()) {
      setParsed(null);
      setParams([]);
      return;
    }

    try {
      const urlObj = new URL(urlString);

      setParsed({
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin,
        href: urlObj.href,
      });

      const paramArray: [string, string][] = [];
      urlObj.searchParams.forEach((value, key) => {
        paramArray.push([key, value]);
      });
      setParams(paramArray);
    } catch (err) {
      setParsed({ error: "Invalid URL" });
      setParams([]);
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
        <h1 className="text-3xl font-bold mb-2">URL Parser</h1>
        <p className="text-muted-foreground">
          Parse and analyze URL components
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>URL Input</CardTitle>
          <CardDescription>Enter a URL to parse</CardDescription>
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
                <InfoRow label="Port" value={parsed.port} />
                <InfoRow label="Origin" value={parsed.origin} />
              </div>

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
                  {params.map(([key, value], i) => (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Key</Label>
                        <div className="p-2 bg-muted rounded font-mono text-sm">
                          {key}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Value</Label>
                        <div className="p-2 bg-muted rounded font-mono text-sm">
                          {value}
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
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-red-600 dark:text-red-400">{parsed.error}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
