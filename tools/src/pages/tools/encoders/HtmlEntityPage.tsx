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

export default function HtmlEntityConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const encodeHtmlEntities = (str: string): string => {
    const textarea = document.createElement("textarea");
    textarea.textContent = str;
    const encoded = textarea.innerHTML;
    return encoded;
  };

  const decodeHtmlEntities = (str: string): string => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.textContent || "";
  };

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (mode === "encode") {
      setOutput(encodeHtmlEntities(input));
    } else {
      setOutput(decodeHtmlEntities(input));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput(input);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTML Entity Encoder/Decoder</h1>
        <p className="text-muted-foreground">
          Convert special characters to HTML entities and vice versa
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{mode === "encode" ? "Plain Text" : "HTML Entities"}</CardTitle>
            <CardDescription>
              {mode === "encode" ? "Enter text to encode" : "Enter HTML entities to decode"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder={
                mode === "encode"
                  ? 'Enter text with special characters: <>&"'
                  : "Enter HTML entities: &lt;&gt;&amp;&quot;"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={convert} className="flex-1">
                <ArrowRight className="mr-2 w-4 h-4" />
                {mode === "encode" ? "Encode" : "Decode"}
              </Button>
              <Button onClick={switchMode} variant="outline">
                ⇄ Switch
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>{mode === "encode" ? "HTML Entities" : "Plain Text"}</CardTitle>
            <CardDescription>
              {mode === "encode" ? "Encoded HTML entities" : "Decoded plain text"}
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
