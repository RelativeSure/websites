import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [savings, setSavings] = useState({ original: 0, minified: 0, percent: 0 });

  const minifyCss = (css: string): string => {
    if (!css.trim()) return "";

    let minified = css;

    // Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove whitespace
    minified = minified.replace(/\s+/g, " ");

    // Remove spaces around {, }, :, ;, and ,
    minified = minified.replace(/\s*{\s*/g, "{");
    minified = minified.replace(/\s*}\s*/g, "}");
    minified = minified.replace(/\s*:\s*/g, ":");
    minified = minified.replace(/\s*;\s*/g, ";");
    minified = minified.replace(/\s*,\s*/g, ",");

    // Remove last semicolon in a block
    minified = minified.replace(/;}/g, "}");

    // Remove spaces after (
    minified = minified.replace(/\(\s+/g, "(");
    // Remove spaces before )
    minified = minified.replace(/\s+\)/g, ")");

    return minified.trim();
  };

  const minify = () => {
    if (!input.trim()) {
      setOutput("");
      setSavings({ original: 0, minified: 0, percent: 0 });
      return;
    }

    const minified = minifyCss(input);
    setOutput(minified);

    const originalSize = input.length;
    const minifiedSize = minified.length;
    const percent = ((originalSize - minifiedSize) / originalSize * 100);

    setSavings({
      original: originalSize,
      minified: minifiedSize,
      percent: Math.round(percent),
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">CSS Minifier</h1>
        <p className="text-muted-foreground">
          Minify and compress CSS code
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>CSS Input</CardTitle>
            <CardDescription>Enter CSS to minify</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder=".my-class {&#10;  color: red;&#10;  margin: 10px;&#10;}"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 resize-none text-sm"
            />
            <Button onClick={minify} className="w-full">
              Minify CSS
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Minified CSS</CardTitle>
            <CardDescription>
              Compressed output
              {savings.original > 0 && (
                <span className="ml-2 text-primary font-semibold">
                  ({savings.percent}% smaller: {savings.original} → {savings.minified} bytes)
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Minified CSS will appear here..."
              value={output}
              readOnly
              className="font-mono flex-1 resize-none text-sm"
            />
            <Button
              onClick={copyToClipboard}
              disabled={!output}
              variant="outline"
              className="w-full"
            >
              {copied ? (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-4 h-4" />
                  Copy CSS
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
