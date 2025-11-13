import { ArrowLeftRight, Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CsvToJsonPage() {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState(",");

  const parseCSV = (csv: string, delimiter: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = "";
    let insideQuotes = false;

    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      const nextChar = csv[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === delimiter && !insideQuotes) {
        // Field separator
        currentRow.push(currentField);
        currentField = "";
      } else if ((char === "\n" || char === "\r") && !insideQuotes) {
        // Row separator
        if (currentField || currentRow.length > 0) {
          currentRow.push(currentField);
          rows.push(currentRow);
          currentRow = [];
          currentField = "";
        }
        // Skip \r\n
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
      } else {
        currentField += char;
      }
    }

    // Add last field and row
    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    return rows;
  };

  const convertToJSON = () => {
    try {
      if (!csvInput.trim()) {
        setError("Please enter CSV data");
        return;
      }

      const rows = parseCSV(csvInput, delimiter);

      if (rows.length === 0) {
        setError("No data found in CSV");
        return;
      }

      let headers: string[];
      let dataRows: string[][];

      if (hasHeaders) {
        headers = rows[0];
        dataRows = rows.slice(1);
      } else {
        // Generate column names: col1, col2, col3, etc.
        const columnCount = rows[0].length;
        headers = Array.from({ length: columnCount }, (_, i) => `col${i + 1}`);
        dataRows = rows;
      }

      // Convert to array of objects
      const json = dataRows.map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || "";
        });
        return obj;
      });

      setJsonOutput(JSON.stringify(json, null, 2));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
      setJsonOutput("");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exampleCSV = `name,email,age,city
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,Los Angeles
Bob Johnson,bob@example.com,35,Chicago`;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">CSV to JSON Converter</h1>
        <p className="text-muted-foreground">Convert CSV data to JSON format</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>CSV Input</CardTitle>
            <CardDescription>Enter your CSV data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder={exampleCSV}
              className="min-h-[400px] font-mono text-sm"
            />
            <Button variant="outline" size="sm" onClick={() => setCsvInput(exampleCSV)} className="w-full">
              Load Example
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSON Output</CardTitle>
            <CardDescription>Converted JSON array</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jsonOutput}
              readOnly
              placeholder="JSON output will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            {jsonOutput && (
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
            <Checkbox id="headers" checked={hasHeaders} onCheckedChange={(checked) => setHasHeaders(!!checked)} />
            <label
              htmlFor="headers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              First row contains headers
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

      <Button onClick={convertToJSON} className="w-full" size="lg">
        <ArrowLeftRight className="mr-2 h-4 w-4" />
        Convert to JSON
      </Button>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• CSV must have consistent column count in all rows</p>
          <p>• Values with commas, quotes, or newlines should be enclosed in double quotes</p>
          <p>• Double quotes inside values should be escaped as "" (two double quotes)</p>
          <p>• If "First row contains headers" is unchecked, columns will be named col1, col2, etc.</p>
        </CardContent>
      </Card>
    </div>
  );
}
