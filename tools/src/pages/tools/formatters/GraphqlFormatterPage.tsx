import { Check, Code2, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function GraphqlFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatGraphQL = () => {
    try {
      // Basic GraphQL formatting
      let formatted = input.trim();
      // Add newlines after { and before }
      formatted = formatted.replace(/\{/g, " {\n  ");
      formatted = formatted.replace(/\}/g, "\n}");
      // Add newlines after commas in arguments
      formatted = formatted.replace(/,\s*/g, ",\n  ");
      // Clean up extra spaces
      formatted = formatted.replace(/\s+/g, " ");
      // Fix indentation
      const lines = formatted.split("\n");
      let indent = 0;
      formatted = lines
        .map((line) => {
          line = line.trim();
          if (line.includes("}")) indent--;
          const result = "  ".repeat(Math.max(0, indent)) + line;
          if (line.includes("{")) indent++;
          return result;
        })
        .join("\n");
      setOutput(formatted);
    } catch (err) {
      setOutput("Error formatting GraphQL");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const example = "query{user(id:123){name email posts{title body comments{author text}}}}";

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">GraphQL Formatter</h1>
      <p className="text-muted-foreground mb-6">Format and beautify GraphQL queries</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste GraphQL here..."
              className="font-mono text-sm min-h-[400px]"
            />
            <Button variant="outline" size="sm" onClick={() => setInput(example)}>
              Load Example
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Formatted Output</CardTitle>
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
              placeholder="Formatted GraphQL..."
              className="font-mono text-sm min-h-[400px] bg-muted"
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button onClick={formatGraphQL} size="lg">
          <Code2 className="h-4 w-4 mr-2" />
          Format GraphQL
        </Button>
      </div>
    </div>
  );
}
