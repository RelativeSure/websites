import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copied, setCopied] = useState(false);

  const formatHtml = (html: string): string => {
    let formatted = "";
    let indent = 0;
    const tab = "  ";

    html.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) {
        indent = Math.max(0, indent - 1);
      }

      formatted += tab.repeat(indent) + "<" + node + ">\n";

      if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith("input") && !node.startsWith("br") && !node.startsWith("hr") && !node.startsWith("img") && !node.startsWith("meta") && !node.startsWith("link")) {
        indent++;
      }
    });

    return formatted
      .replace(/^\s+/, "")
      .replace(/\n\s*\n/g, "\n")
      .trim();
  };

  const minifyHtml = (html: string): string => {
    return html
      .replace(/\n/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
  };

  const process = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (mode === "format") {
      setOutput(formatHtml(input));
    } else {
      setOutput(minifyHtml(input));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTML Formatter</h1>
        <p className="text-muted-foreground">
          Format and minify HTML code
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>HTML Input</CardTitle>
            <CardDescription>Enter HTML to {mode}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="<div><p>Your HTML here</p></div>"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 resize-none text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setMode("format");
                  setTimeout(process, 0);
                }}
                variant={mode === "format" ? "default" : "outline"}
                className="flex-1"
              >
                Format
              </Button>
              <Button
                onClick={() => {
                  setMode("minify");
                  setTimeout(process, 0);
                }}
                variant={mode === "minify" ? "default" : "outline"}
                className="flex-1"
              >
                Minify
              </Button>
            </div>
            <Button onClick={process} className="w-full">
              Process HTML
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Processed HTML</CardTitle>
            <CardDescription>
              {mode === "format" ? "Formatted" : "Minified"} output
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Processed HTML will appear here..."
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
                  Copy HTML
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
