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

export default function CsvJsonConverter() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const csvToJson = (csvStr: string): any[] => {
    const lines = csvStr.trim().split("\n");
    if (lines.length < 2) {
      throw new Error("CSV must have at least a header row and one data row");
    }

    // Parse CSV line (simple parser - handles quoted fields)
    const parseCsvLine = (line: string): string[] => {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++; // Skip next quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current.trim());
      return result;
    };

    const headers = parseCsvLine(lines[0]);
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCsvLine(line);
      const obj: any = {};

      headers.forEach((header, index) => {
        const value = values[index] || "";
        // Try to convert to number if possible
        const numValue = Number(value);
        obj[header] = isNaN(numValue) ? value : numValue;
      });

      data.push(obj);
    }

    return data;
  };

  const convertToJson = () => {
    if (!csv.trim()) {
      setJson("");
      setError("");
      return;
    }

    try {
      const result = csvToJson(csv);
      const formatted = JSON.stringify(result, null, 2);
      setJson(formatted);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid CSV");
      setJson("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">CSV to JSON Converter</h1>
        <p className="text-muted-foreground">
          Convert CSV data to JSON format
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>CSV Input</CardTitle>
            <CardDescription>Enter CSV with header row</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              className="font-mono flex-1 resize-none"
            />
            <Button onClick={convertToJson} className="w-full">
              <ArrowRight className="mr-2 w-4 h-4" />
              Convert to JSON
            </Button>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>JSON Output</CardTitle>
            <CardDescription>Converted JSON array</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="JSON output will appear here..."
              value={json}
              readOnly
              className="font-mono flex-1 resize-none"
            />
            <Button
              onClick={copyToClipboard}
              disabled={!json}
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
                  Copy JSON
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
