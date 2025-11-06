import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, Code2 } from "lucide-react";

export default function StringEscapePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [mode, setMode] = useState("escape");
  const [copied, setCopied] = useState(false);

  const escapeString = (str: string, lang: string): string => {
    switch (lang) {
      case "javascript":
        return str.replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t");
      case "python":
        return str.replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t");
      case "java":
        return str.replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t");
      case "json":
        return JSON.stringify(str).slice(1, -1);
      case "html":
        return str.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      case "sql":
        return str.replace(/'/g, "''");
      default:
        return str;
    }
  };

  const unescapeString = (str: string, lang: string): string => {
    try {
      switch (lang) {
        case "javascript":
        case "python":
        case "java":
          return str.replace(/\\n/g, "\n")
            .replace(/\\r/g, "\r")
            .replace(/\\t/g, "\t")
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, "\\");
        case "json":
          return JSON.parse(`"${str}"`);
        case "html":
          return str.replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&");
        case "sql":
          return str.replace(/''/g, "'");
        default:
          return str;
      }
    } catch {
      return str;
    }
  };

  const handleProcess = () => {
    if (mode === "escape") {
      setOutput(escapeString(input, language));
    } else {
      setOutput(unescapeString(input, language));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const examples = {
    javascript: 'const msg = "Hello\\nWorld";',
    python: 'msg = "Hello\\nWorld"',
    java: 'String msg = "Hello\\nWorld";',
    json: '{"message": "Hello\\nWorld"}',
    html: '&lt;div&gt;Hello&lt;/div&gt;',
    sql: "SELECT * WHERE name = ''John''",
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">String Escape/Unescape</h1>
        <p className="text-muted-foreground">
          Escape and unescape strings for different programming languages
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={mode === "escape" ? "default" : "outline"}
                onClick={() => setMode("escape")}
                className="flex-1"
              >
                Escape
              </Button>
              <Button
                variant={mode === "unescape" ? "default" : "outline"}
                onClick={() => setMode("unescape")}
                className="flex-1"
              >
                Unescape
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>
              Enter string to {mode}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter ${mode === "escape" ? "unescaped" : "escaped"} string...`}
              className="min-h-[400px] font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput(examples[language as keyof typeof examples])}
              className="w-full mt-4"
            >
              Load Example
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Output</CardTitle>
                <CardDescription>
                  {mode === "escape" ? "Escaped" : "Unescaped"} result
                </CardDescription>
              </div>
              {output && (
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
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="min-h-[400px] font-mono text-sm bg-muted"
            />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleProcess} className="w-full" size="lg">
        {mode === "escape" ? "Escape" : "Unescape"} String
      </Button>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Escape Sequences by Language</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Common Escapes</h4>
            <div className="space-y-1 font-mono text-xs">
              <div>\n - Newline</div>
              <div>\r - Carriage return</div>
              <div>\t - Tab</div>
              <div>\\ - Backslash</div>
              <div>\" - Double quote</div>
              <div>\' - Single quote</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">HTML Entities</h4>
            <div className="space-y-1 font-mono text-xs">
              <div>&amp;lt; - &lt;</div>
              <div>&amp;gt; - &gt;</div>
              <div>&amp;amp; - &amp;</div>
              <div>&amp;quot; - "</div>
              <div>&amp;#039; - '</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
