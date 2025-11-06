import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code2, Copy, Check, Download, AlertCircle } from "lucide-react";

export default function JsMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    removeNewlines: true,
    preserveStrings: true,
  });

  const minifyJavaScript = () => {
    setError("");
    if (!input.trim()) {
      setError("Please enter JavaScript code to minify");
      return;
    }

    try {
      let code = input;
      setOriginalSize(new Blob([code]).size);

      // Remove single-line comments (//)
      if (options.removeComments) {
        code = code.replace(/\/\/[^\n]*/g, "");
        // Remove multi-line comments (/* */)
        code = code.replace(/\/\*[\s\S]*?\*\//g, "");
      }

      // Preserve strings and regex by replacing them temporarily
      const strings: string[] = [];
      const regexes: string[] = [];

      if (options.preserveStrings) {
        // Extract and preserve string literals
        code = code.replace(/(["'`])((?:\\\1|(?!\1).)*?)\1/g, (match) => {
          const index = strings.length;
          strings.push(match);
          return `__STRING_${index}__`;
        });

        // Extract and preserve regex literals (basic)
        code = code.replace(/\/(?![*/])([^/\\]|\\.)+?\/[gimyus]*/g, (match) => {
          const index = regexes.length;
          regexes.push(match);
          return `__REGEX_${index}__`;
        });
      }

      // Remove extra whitespace
      if (options.removeWhitespace) {
        code = code.replace(/\s+/g, " ");
        // Remove spaces around operators and punctuation
        code = code.replace(/\s*([=+\-*/<>!&|?:,;(){}[\]])\s*/g, "$1");
      }

      // Remove newlines
      if (options.removeNewlines) {
        code = code.replace(/\n+/g, "");
      }

      // Restore strings and regexes
      if (options.preserveStrings) {
        strings.forEach((str, index) => {
          code = code.replace(`__STRING_${index}__`, str);
        });
        regexes.forEach((regex, index) => {
          code = code.replace(`__REGEX_${index}__`, regex);
        });
      }

      code = code.trim();

      setOutput(code);
      setMinifiedSize(new Blob([code]).size);
    } catch (err) {
      setError("An error occurred during minification");
      console.error(err);
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

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "minified.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const savingsPercent =
    originalSize > 0
      ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1)
      : 0;

  const exampleCode = `// Example JavaScript function
function calculateSum(numbers) {
  // Check if the input is an array
  if (!Array.isArray(numbers)) {
    throw new Error("Input must be an array");
  }

  /*
   * Calculate the sum of all numbers
   * using the reduce method
   */
  return numbers.reduce((total, num) => {
    return total + num;
  }, 0);
}

// Export the function
export default calculateSum;`;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JavaScript Minifier</h1>
        <p className="text-muted-foreground">
          Minify JavaScript code to reduce file size
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              JavaScript Input
            </CardTitle>
            <CardDescription>
              Paste your JavaScript code to minify
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="// Paste JavaScript code here..."
              className="font-mono text-sm min-h-[300px]"
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
            <CardTitle>Options</CardTitle>
            <CardDescription>
              Minification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="removeComments"
                checked={options.removeComments}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, removeComments: checked as boolean })
                }
              />
              <Label
                htmlFor="removeComments"
                className="text-sm font-normal cursor-pointer"
              >
                Remove comments
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="removeWhitespace"
                checked={options.removeWhitespace}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, removeWhitespace: checked as boolean })
                }
              />
              <Label
                htmlFor="removeWhitespace"
                className="text-sm font-normal cursor-pointer"
              >
                Remove whitespace
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="removeNewlines"
                checked={options.removeNewlines}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, removeNewlines: checked as boolean })
                }
              />
              <Label
                htmlFor="removeNewlines"
                className="text-sm font-normal cursor-pointer"
              >
                Remove newlines
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="preserveStrings"
                checked={options.preserveStrings}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, preserveStrings: checked as boolean })
                }
              />
              <Label
                htmlFor="preserveStrings"
                className="text-sm font-normal cursor-pointer"
              >
                Preserve strings
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 mb-6">
        <Button onClick={minifyJavaScript} className="flex-1 lg:flex-none">
          <Code2 className="h-4 w-4 mr-2" />
          Minify JavaScript
        </Button>
        <Button
          variant="outline"
          onClick={() => setInput(exampleCode)}
        >
          Load Example
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md mb-6">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {output && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Minified Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {(minifiedSize / 1024).toFixed(2)} KB
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
                  {((originalSize - minifiedSize) / 1024).toFixed(2)} KB
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Minified JavaScript</CardTitle>
                  <CardDescription>Your minified code</CardDescription>
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
                value={output}
                readOnly
                className="font-mono text-xs min-h-[200px] bg-muted"
              />
            </CardContent>
          </Card>
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About JavaScript Minification</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            JavaScript minification reduces file size by removing unnecessary
            characters (whitespace, comments, newlines) without changing functionality.
          </p>
          <p>
            <strong>Note:</strong> This is a basic minifier. For production use,
            consider professional tools like:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Terser</strong> - Industry-standard JS minifier with advanced
              optimizations
            </li>
            <li>
              <strong>UglifyJS</strong> - Popular minification tool with name mangling
            </li>
            <li>
              <strong>esbuild</strong> - Extremely fast bundler with minification
            </li>
            <li>
              <strong>SWC</strong> - Rust-based compiler with minification
            </li>
          </ul>
          <p>
            <strong>Advanced optimizations</strong> like variable name mangling,
            dead code elimination, and tree shaking require AST parsing and are
            beyond the scope of this basic tool.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
