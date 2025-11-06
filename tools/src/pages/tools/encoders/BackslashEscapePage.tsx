import { useState } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BackslashEscape() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [copied, setCopied] = useState(false);

  const escapeString = (str: string): string => {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'");
  };

  const unescapeString = (str: string): string => {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  };

  const process = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (mode === "escape") {
      setOutput(escapeString(input));
    } else {
      setOutput(unescapeString(input));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = () => {
    setMode(mode === "escape" ? "unescape" : "escape");
    setInput(output);
    setOutput(input);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Backslash Escape/Unescape</h1>
        <p className="text-muted-foreground">
          Escape or unescape special characters with backslashes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{mode === "escape" ? "Original Text" : "Escaped Text"}</CardTitle>
            <CardDescription>
              {mode === "escape" ? "Enter text to escape" : "Enter text to unescape"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder={mode === "escape" ? 'Text with\nnew lines and "quotes"' : 'Text\\nwith\\nescaped\\ncharacters'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={process} className="flex-1">
                <ArrowRight className="mr-2 w-4 h-4" />
                {mode === "escape" ? "Escape" : "Unescape"}
              </Button>
              <Button onClick={switchMode} variant="outline">
                ⇄ Switch
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{mode === "escape" ? "Escaped Text" : "Original Text"}</CardTitle>
            <CardDescription>
              {mode === "escape" ? "Escaped output" : "Unescaped output"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Output will appear here..."
              value={output}
              readOnly
              className="font-mono flex-1 resize-none"
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
                  Copy Output
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
