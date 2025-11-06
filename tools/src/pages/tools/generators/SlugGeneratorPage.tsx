import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export default function SlugGeneratorPage() {
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    let result = text.trim();

    // Convert to lowercase if enabled
    if (lowercase) {
      result = result.toLowerCase();
    }

    // Replace special characters and spaces
    result = result
      .normalize("NFD") // Normalize unicode
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, separator) // Replace spaces with separator
      .replace(/-+/g, separator) // Replace multiple separators with single
      .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), ""); // Trim separators

    setSlug(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const examples = [
    { input: "Hello World!", output: "hello-world" },
    { input: "This is a Test_123", output: "this-is-a-test-123" },
    { input: "Café & Restaurant", output: "cafe-restaurant" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Slug Generator</h1>
        <p className="text-muted-foreground">
          Convert text to URL-friendly slugs
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Enter text to convert to a slug</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="separator">Separator</Label>
              <Input
                id="separator"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                placeholder="-"
                maxLength={1}
                className="font-mono"
              />
            </div>

            <div className="flex items-end space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Lowercase</span>
              </label>
            </div>
          </div>

          <Button onClick={generateSlug} className="w-full">
            Generate Slug
          </Button>
        </CardContent>
      </Card>

      {slug && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Slug</CardTitle>
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
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-primary/10 rounded-md">
              <p className="font-mono text-lg break-all">{slug}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {examples.map((example, i) => (
              <div key={i} className="p-3 bg-muted rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Input:</div>
                <div className="font-mono text-sm mb-2">{example.input}</div>
                <div className="text-sm text-muted-foreground mb-1">Output:</div>
                <div className="font-mono text-sm text-primary">{example.output}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
