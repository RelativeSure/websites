import { Download, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FaviconSize {
  size: number;
  name: string;
  description: string;
}

export default function FaviconGeneratorPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 180, 192, 512]);
  const [generatedFavicons, setGeneratedFavicons] = useState<Map<number, string>>(new Map());

  const faviconSizes: FaviconSize[] = [
    { size: 16, name: "favicon-16x16.png", description: "Browser tab (small)" },
    { size: 32, name: "favicon-32x32.png", description: "Browser tab (standard)" },
    { size: 48, name: "favicon-48x48.png", description: "Windows site icons" },
    { size: 64, name: "favicon-64x64.png", description: "Windows site icons" },
    { size: 96, name: "favicon-96x96.png", description: "Google TV" },
    { size: 120, name: "apple-touch-icon-120x120.png", description: "iPhone retina" },
    { size: 152, name: "apple-touch-icon-152x152.png", description: "iPad retina" },
    { size: 167, name: "apple-touch-icon-167x167.png", description: "iPad Pro" },
    { size: 180, name: "apple-touch-icon-180x180.png", description: "iPhone X" },
    { size: 192, name: "android-chrome-192x192.png", description: "Android" },
    { size: 512, name: "android-chrome-512x512.png", description: "Android (large)" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setGeneratedFavicons(new Map());
    };
    reader.readAsDataURL(file);
  };

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const generateFavicons = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const newFavicons = new Map<number, string>();

      selectedSizes.forEach((size) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fill with transparent background
        ctx.clearRect(0, 0, size, size);

        // Draw image scaled to fit
        ctx.drawImage(img, 0, 0, size, size);

        // Convert to data URL
        const dataUrl = canvas.toDataURL("image/png");
        newFavicons.set(size, dataUrl);
      });

      setGeneratedFavicons(newFavicons);
    };
    img.src = originalImage;
  };

  const downloadFavicon = (size: number, dataUrl: string) => {
    const favicon = faviconSizes.find((f) => f.size === size);
    if (!favicon) return;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = favicon.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    generatedFavicons.forEach((dataUrl, size) => {
      setTimeout(() => {
        downloadFavicon(size, dataUrl);
      }, size * 10); // Stagger downloads to avoid browser blocking
    });
  };

  const generateHtmlCode = () => {
    const lines = ["<!-- Favicon tags -->"];

    if (generatedFavicons.has(16)) {
      lines.push('<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">');
    }
    if (generatedFavicons.has(32)) {
      lines.push('<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">');
    }
    if (generatedFavicons.has(48)) {
      lines.push('<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">');
    }
    if (generatedFavicons.has(180)) {
      lines.push('<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">');
    }
    if (generatedFavicons.has(192)) {
      lines.push('<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">');
    }
    if (generatedFavicons.has(512)) {
      lines.push('<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">');
    }

    return lines.join("\n");
  };

  const selectPreset = (preset: string) => {
    switch (preset) {
      case "minimal":
        setSelectedSizes([16, 32, 180]);
        break;
      case "standard":
        setSelectedSizes([16, 32, 180, 192]);
        break;
      case "complete":
        setSelectedSizes(faviconSizes.map((f) => f.size));
        break;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Favicon Generator</h1>
        <p className="text-muted-foreground">Generate favicons in multiple sizes from a single image</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>Upload a square image (PNG recommended, at least 512x512px)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" asChild>
            <label>
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </Button>

          {originalImage && (
            <div className="border rounded p-4">
              <div className="text-sm font-semibold mb-2">Preview:</div>
              <img src={originalImage} alt="Original" className="max-w-[200px] max-h-[200px] border rounded" />
            </div>
          )}
        </CardContent>
      </Card>

      {originalImage && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Select Sizes</CardTitle>
                  <CardDescription>Choose which favicon sizes to generate</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => selectPreset("minimal")}>
                    Minimal
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => selectPreset("standard")}>
                    Standard
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => selectPreset("complete")}>
                    Complete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {faviconSizes.map((favicon) => (
                  <div key={favicon.size} className="flex items-start space-x-2">
                    <Checkbox
                      id={`size-${favicon.size}`}
                      checked={selectedSizes.includes(favicon.size)}
                      onCheckedChange={() => toggleSize(favicon.size)}
                    />
                    <Label htmlFor={`size-${favicon.size}`} className="cursor-pointer leading-tight">
                      <div className="font-semibold">
                        {favicon.size}×{favicon.size}
                      </div>
                      <div className="text-xs text-muted-foreground">{favicon.description}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <Button onClick={generateFavicons} size="lg" className="w-full lg:w-auto">
              <ImageIcon className="h-4 w-4 mr-2" />
              Generate Favicons
            </Button>
          </div>
        </>
      )}

      {generatedFavicons.size > 0 && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Favicons</CardTitle>
                  <CardDescription>
                    {generatedFavicons.size} favicon{generatedFavicons.size !== 1 ? "s" : ""} generated
                  </CardDescription>
                </div>
                <Button onClick={downloadAll}>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from(generatedFavicons.entries()).map(([size, dataUrl]) => {
                  const _favicon = faviconSizes.find((f) => f.size === size);
                  return (
                    <div key={size} className="border rounded p-3 text-center">
                      <img
                        src={dataUrl}
                        alt={`${size}x${size}`}
                        className="mx-auto mb-2"
                        style={{ width: Math.min(size, 64), height: Math.min(size, 64) }}
                      />
                      <div className="text-sm font-semibold mb-1">
                        {size}×{size}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadFavicon(size, dataUrl)}
                        className="w-full"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HTML Code</CardTitle>
              <CardDescription>Add these tags to your HTML &lt;head&gt; section</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                <code>{generateHtmlCode()}</code>
              </pre>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Favicons</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Favicons are small icons that represent your website in browser tabs, bookmarks, and mobile home screens.
          </p>
          <div>
            <strong>Recommended sizes:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>16×16 and 32×32:</strong> Browser tabs and bookmarks
              </li>
              <li>
                <strong>180×180:</strong> Apple Touch Icon (iOS)
              </li>
              <li>
                <strong>192×192 and 512×512:</strong> Android and PWA
              </li>
            </ul>
          </div>
          <p>
            <strong>Best practices:</strong> Use a square image with a simple, recognizable design. PNG format with
            transparency works best. The tool will automatically scale your image to all selected sizes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
