import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileImage, Copy, Check, Download, Upload } from "lucide-react";

export default function SvgOptimizerPage() {
  const [inputSvg, setInputSvg] = useState("");
  const [outputSvg, setOutputSvg] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [copied, setCopied] = useState(false);

  const [options, setOptions] = useState({
    removeComments: true,
    removeMetadata: true,
    removeEmptyAttrs: true,
    removeHiddenElems: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    cleanupIds: true,
    minifyStyles: true,
    convertColors: true,
    removeUselessDefs: true,
    cleanupNumericValues: true,
    convertPathData: true,
    removeXMLNS: false,
  });

  const optimizeSvg = () => {
    if (!inputSvg.trim()) return;

    let svg = inputSvg;
    setOriginalSize(new Blob([svg]).size);

    // Remove XML/HTML comments
    if (options.removeComments) {
      svg = svg.replace(/<!--[\s\S]*?-->/g, "");
    }

    // Remove metadata tags
    if (options.removeMetadata) {
      svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
      svg = svg.replace(/<title[\s\S]*?<\/title>/gi, "");
      svg = svg.replace(/<desc[\s\S]*?<\/desc>/gi, "");
    }

    // Remove empty attributes
    if (options.removeEmptyAttrs) {
      svg = svg.replace(/\s+\w+=""\s*/g, " ");
    }

    // Remove display:none and visibility:hidden elements
    if (options.removeHiddenElems) {
      svg = svg.replace(/<[^>]*display:\s*none[^>]*>[\s\S]*?<\/[^>]+>/gi, "");
      svg = svg.replace(/<[^>]*visibility:\s*hidden[^>]*>[\s\S]*?<\/[^>]+>/gi, "");
    }

    // Remove empty text elements
    if (options.removeEmptyText) {
      svg = svg.replace(/<text[^>]*>\s*<\/text>/gi, "");
    }

    // Remove empty g elements
    if (options.removeEmptyContainers) {
      svg = svg.replace(/<g[^>]*>\s*<\/g>/gi, "");
    }

    // Cleanup IDs (remove unused ones)
    if (options.cleanupIds) {
      const idMatches = svg.match(/id="([^"]+)"/g);
      if (idMatches) {
        idMatches.forEach((match) => {
          const id = match.match(/id="([^"]+)"/)?.[1];
          if (id) {
            const urlUsages = (svg.match(new RegExp(`url\\(#${id}\\)`, "g")) || []).length;
            const hrefUsages = (svg.match(new RegExp(`href="#${id}"`, "g")) || []).length;
            if (urlUsages === 0 && hrefUsages === 0) {
              svg = svg.replace(new RegExp(`\\s+id="${id}"`, "g"), "");
            }
          }
        });
      }
    }

    // Minify inline styles
    if (options.minifyStyles) {
      svg = svg.replace(/style="([^"]*)"/g, (match, style) => {
        const minified = style
          .replace(/\s*:\s*/g, ":")
          .replace(/\s*;\s*/g, ";")
          .replace(/;\s*$/g, "");
        return `style="${minified}"`;
      });
    }

    // Convert colors to shorter forms
    if (options.convertColors) {
      // Convert rgb to hex
      svg = svg.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, r, g, b) => {
        const hex = "#" +
          parseInt(r).toString(16).padStart(2, "0") +
          parseInt(g).toString(16).padStart(2, "0") +
          parseInt(b).toString(16).padStart(2, "0");
        return hex;
      });

      // Convert 6-digit hex to 3-digit where possible
      svg = svg.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi, "#$1$2$3");
    }

    // Remove useless defs
    if (options.removeUselessDefs) {
      svg = svg.replace(/<defs>\s*<\/defs>/gi, "");
    }

    // Cleanup numeric values (remove unnecessary decimals)
    if (options.cleanupNumericValues) {
      svg = svg.replace(/(\d+)\.0+(?=\D|$)/g, "$1");
      svg = svg.replace(/(\d+\.\d*?)0+(?=\D|$)/g, "$1");
    }

    // Optimize path data (basic)
    if (options.convertPathData) {
      svg = svg.replace(/d="([^"]*)"/g, (match, path) => {
        const optimized = path
          .replace(/\s+/g, " ")
          .replace(/\s*([,])\s*/g, "$1")
          .replace(/\s*([MLHVCSQTAZmlhvcsqtaz])\s*/g, "$1")
          .trim();
        return `d="${optimized}"`;
      });
    }

    // Remove default xmlns (optional)
    if (options.removeXMLNS) {
      svg = svg.replace(/\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "");
    }

    // Remove extra whitespace
    svg = svg.replace(/\s+/g, " ");
    svg = svg.replace(/>\s+</g, "><");
    svg = svg.trim();

    setOutputSvg(svg);
    setOptimizedSize(new Blob([svg]).size);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputSvg(content);
    };
    reader.readAsText(file);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputSvg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "optimized.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const savingsPercent = originalSize > 0
    ? ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)
    : 0;

  const exampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <!-- This is a comment -->
  <title>Example SVG</title>
  <desc>A simple circle</desc>
  <metadata>
    <rdf:RDF>Some metadata</rdf:RDF>
  </metadata>
  <defs>
    <linearGradient id="unused-gradient">
      <stop offset="0%" style="stop-color: rgb(255, 0, 0); stop-opacity: 1.0" />
    </linearGradient>
  </defs>
  <circle cx="50.0000" cy="50.0000" r="40.0000" fill="#ff0000" stroke="#000000" stroke-width="2.0000" />
  <text></text>
  <g></g>
</svg>`;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">SVG Optimizer</h1>
        <p className="text-muted-foreground">
          Optimize and minify SVG files to reduce file size
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Input SVG
            </CardTitle>
            <CardDescription>
              Paste your SVG code or upload a file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <label>
                  <Upload className="h-4 w-4 mr-1" />
                  Upload SVG
                  <input
                    type="file"
                    accept=".svg,image/svg+xml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputSvg(exampleSvg)}
              >
                Load Example
              </Button>
            </div>
            <Textarea
              value={inputSvg}
              onChange={(e) => setInputSvg(e.target.value)}
              placeholder="Paste SVG code here..."
              className="font-mono text-xs min-h-[300px]"
            />
            {originalSize > 0 && (
              <div className="text-sm text-muted-foreground">
                Original size: {(originalSize / 1024).toFixed(2)} KB
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Options</CardTitle>
            <CardDescription>
              Select optimizations to apply
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(options).map(([key, value]) => (
              <div key={key} className="flex items-start space-x-2">
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, [key]: checked as boolean })
                  }
                />
                <Label
                  htmlFor={key}
                  className="text-sm font-normal leading-tight cursor-pointer"
                >
                  {key.replace(/([A-Z])/g, " $1").trim().replace(/^./, (str) => str.toUpperCase())}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Button onClick={optimizeSvg} size="lg" className="w-full lg:w-auto">
          <FileImage className="h-4 w-4 mr-2" />
          Optimize SVG
        </Button>
      </div>

      {outputSvg && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimized Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {(optimizedSize / 1024).toFixed(2)} KB
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {savingsPercent}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Size Reduced</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {((originalSize - optimizedSize) / 1024).toFixed(2)} KB
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Optimized SVG</CardTitle>
                  <CardDescription>Your optimized SVG code</CardDescription>
                </div>
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
              <Textarea
                value={outputSvg}
                readOnly
                className="font-mono text-xs min-h-[300px] bg-muted"
              />
            </CardContent>
          </Card>
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About SVG Optimization</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            SVG optimization removes unnecessary data from SVG files without
            affecting the visual output, resulting in smaller file sizes.
          </p>
          <p>
            <strong>Common optimizations include:</strong> Removing metadata and
            comments, cleaning up numeric values, converting colors to shorter forms,
            optimizing path data, and removing unused elements.
          </p>
          <p>
            <strong>Note:</strong> This is a basic optimizer. For production use,
            consider tools like SVGO for more advanced optimization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
