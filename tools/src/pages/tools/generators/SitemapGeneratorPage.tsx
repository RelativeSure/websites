import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Download, Copy, Check } from "lucide-react";

interface UrlEntry {
  loc: string;
  changefreq: string;
  priority: string;
}

export default function SitemapGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [urls, setUrls] = useState<UrlEntry[]>([
    { loc: "/", changefreq: "daily", priority: "1.0" },
    { loc: "/about", changefreq: "monthly", priority: "0.8" }
  ]);
  const [copied, setCopied] = useState(false);

  const addUrl = () => {
    setUrls([...urls, { loc: "", changefreq: "weekly", priority: "0.5" }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: keyof UrlEntry, value: string) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    return xml;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateSitemap());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateSitemap()], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sitemap.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Sitemap.xml Generator</h1>
      <p className="text-muted-foreground mb-6">Generate XML sitemaps for search engines</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Base Configuration</CardTitle></CardHeader>
            <CardContent>
              <Label>Base URL</Label>
              <Input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://example.com" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>URLs ({urls.length})</CardTitle>
                <Button size="sm" onClick={addUrl}><Plus className="h-4 w-4 mr-1" />Add URL</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
              {urls.map((url, index) => (
                <div key={index} className="border rounded p-3 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">URL {index + 1}</span>
                    {urls.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeUrl(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input placeholder="/path" value={url.loc} onChange={(e) => updateUrl(index, 'loc', e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={url.changefreq} onValueChange={(v) => updateUrl(index, 'changefreq', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">Always</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Priority" value={url.priority} onChange={(e) => updateUrl(index, 'priority', e.target.value)} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Sitemap</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <><Check className="h-4 w-4 mr-1" />Copied</> : <><Copy className="h-4 w-4 mr-1" />Copy</>}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea value={generateSitemap()} readOnly className="font-mono text-xs min-h-[600px] bg-muted" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
