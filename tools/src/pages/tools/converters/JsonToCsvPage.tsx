import { ArrowLeftRight, Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState(",");

  const convertToCSV = () => {
    try {
      const data = JSON.parse(jsonInput);

      // Handle array of objects
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0]);

        let csv = "";

        // Add headers
        if (includeHeaders) {
          csv = headers.map(escapeCSVValue).join(delimiter) + "\n";
        }

        // Add rows
        data.forEach((row) => {
          const values = headers.map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return "";
            if (typeof value === "object") return escapeCSVValue(JSON.stringify(value));
            return escapeCSVValue(String(value));
          });
          csv += values.join(delimiter) + "\n";
        });

        setCsvOutput(csv);
        setError("");
      } else if (typeof data === "object" && !Array.isArray(data)) {
        // Handle single object - convert to single row
        const headers = Object.keys(data);

        let csv = "";

        if (includeHeaders) {
          csv = headers.map(escapeCSVValue).join(delimiter) + "\n";
        }

        const values = headers.map((header) => {
          const value = data[header];
          if (value === null || value === undefined) return "";
          if (typeof value === "object") return escapeCSVValue(JSON.stringify(value));
          return escapeCSVValue(String(value));
        });
        csv += values.join(delimiter) + "\n";

        setCsvOutput(csv);
        setError("");
      } else {
        throw new Error("JSON must be an object or array of objects");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setCsvOutput("");
    }
  };

  const escapeCSVValue = (value: string): string => {
    // If value contains delimiter, newline, or quote, wrap in quotes and escape internal quotes
    if (value.includes(delimiter) || value.includes("\n") || value.includes('"')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(csvOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exampleJSON = `[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 25,
    "city": "Los Angeles"
  }
]`;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON to CSV Converter</h1>
        <p className="text-muted-foreground">Convert JSON data to CSV format</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Input</CardTitle>
            <CardDescription>Enter your JSON array or object</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={exampleJSON}
              className="min-h-[400px] font-mono text-sm"
            />
            <Button variant="outline" size="sm" onClick={() => setJsonInput(exampleJSON)} className="w-full">
              Load Example
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CSV Output</CardTitle>
            <CardDescription>Converted CSV data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={csvOutput}
              readOnly
              placeholder="CSV output will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            {csvOutput && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
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
                <Button variant="outline" size="sm" onClick={handleDownload} className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
          <strong>Error:</strong> {error}
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="headers"
              checked={includeHeaders}
              onCheckedChange={(checked) => setIncludeHeaders(!!checked)}
            />
            <label
              htmlFor="headers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include column headers
            </label>
          </div>

          <div className="space-y-2">
            <Label>Delimiter</Label>
            <div className="flex gap-2">
              {[
                { label: "Comma (,)", value: "," },
                { label: "Semicolon (;)", value: ";" },
                { label: "Tab", value: "\t" },
                { label: "Pipe (|)", value: "|" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={delimiter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDelimiter(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={convertToCSV} className="w-full" size="lg">
        <ArrowLeftRight className="mr-2 h-4 w-4" />
        Convert to CSV
      </Button>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• JSON input must be an array of objects or a single object</p>
          <p>• All objects in the array should have the same structure</p>
          <p>• Nested objects will be converted to JSON strings</p>
          <p>• Values containing delimiters, quotes, or newlines are automatically escaped</p>
        </CardContent>
      </Card>
    </div>
  );
}
