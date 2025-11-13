import { Check, Copy, Download, FileJson } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ManifestGeneratorPage() {
  const [name, setName] = useState("My App");
  const [shortName, setShortName] = useState("App");
  const [description, setDescription] = useState("My Progressive Web App");
  const [startUrl, setStartUrl] = useState("/");
  const [display, setDisplay] = useState("standalone");
  const [themeColor, setThemeColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  const generateManifest = () => {
    return JSON.stringify(
      {
        name,
        short_name: shortName,
        description,
        start_url: startUrl,
        display,
        theme_color: themeColor,
        background_color: backgroundColor,
        icons: [
          { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
        ],
      },
      null,
      2
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateManifest());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateManifest()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "manifest.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Manifest.json Generator</h1>
      <p className="text-muted-foreground mb-6">Generate PWA manifest files</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Short Name</Label>
              <Input value={shortName} onChange={(e) => setShortName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Start URL</Label>
              <Input value={startUrl} onChange={(e) => setStartUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Display Mode</Label>
              <Select value={display} onValueChange={setDisplay}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standalone">Standalone</SelectItem>
                  <SelectItem value="fullscreen">Fullscreen</SelectItem>
                  <SelectItem value="minimal-ui">Minimal UI</SelectItem>
                  <SelectItem value="browser">Browser</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Theme Color</Label>
                <Input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <Input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Manifest</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea value={generateManifest()} readOnly className="font-mono text-xs min-h-[400px] bg-muted" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
