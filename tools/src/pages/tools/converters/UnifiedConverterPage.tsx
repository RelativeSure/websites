import yaml from "js-yaml";
import { marked } from "marked";
import { ArrowLeftRight, Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormatType = "json" | "yaml" | "xml" | "csv" | "base64" | "markdown" | "html" | "text";

interface ConversionFormat {
  value: FormatType;
  label: string;
}

const formats: ConversionFormat[] = [
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "xml", label: "XML" },
  { value: "csv", label: "CSV" },
  { value: "base64", label: "Base64" },
  { value: "markdown", label: "Markdown" },
  { value: "html", label: "HTML" },
  { value: "text", label: "Plain Text" },
];

export default function UnifiedConverterPage() {
  const [fromFormat, setFromFormat] = useState<FormatType>("json");
  const [toFormat, setToFormat] = useState<FormatType>("yaml");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // CSV Parser
  const parseCSV = (csv: string, delimiter: string = ","): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = "";
    let insideQuotes = false;

    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      const nextChar = csv[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentField += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === delimiter && !insideQuotes) {
        currentRow.push(currentField);
        currentField = "";
      } else if ((char === "\n" || char === "\r") && !insideQuotes) {
        if (currentField || currentRow.length > 0) {
          currentRow.push(currentField);
          rows.push(currentRow);
          currentRow = [];
          currentField = "";
        }
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
      } else {
        currentField += char;
      }
    }

    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    return rows;
  };

  // CSV to JSON
  const csvToJson = (csv: string): string => {
    const rows = parseCSV(csv);
    if (rows.length === 0) throw new Error("No data found in CSV");

    const headers = rows[0];
    const dataRows = rows.slice(1);

    const json = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    return JSON.stringify(json, null, 2);
  };

  // JSON to CSV
  const jsonToCsv = (jsonStr: string): string => {
    const data = JSON.parse(jsonStr);
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("JSON must be an array of objects");
    }

    const headers = Object.keys(data[0]);
    const csvRows: string[] = [];

    // Add headers
    csvRows.push(headers.join(","));

    // Add data rows
    for (const row of data) {
      const values = headers.map((header) => {
        const value = String(row[header] || "");
        // Escape values that contain commas, quotes, or newlines
        if (value.includes(",") || value.includes('"') || value.includes("\n")) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  // XML to JSON
  const xmlToJson = (xmlStr: string): string => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");

    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Invalid XML");
    }

    const parseNode = (node: Element): any => {
      const obj: any = {};

      if (node.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj["@attributes"][attr.name] = attr.value;
        }
      }

      const children = Array.from(node.childNodes);

      if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
        const text = children[0].textContent?.trim();
        if (text) {
          return obj["@attributes"] ? { ...obj, "#text": text } : text;
        }
        return obj["@attributes"] || {};
      }

      for (const child of children) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const element = child as Element;
          const childName = element.nodeName;
          const childValue = parseNode(element);

          if (obj[childName]) {
            if (!Array.isArray(obj[childName])) {
              obj[childName] = [obj[childName]];
            }
            obj[childName].push(childValue);
          } else {
            obj[childName] = childValue;
          }
        }
      }

      return obj;
    };

    return JSON.stringify(parseNode(xmlDoc.documentElement), null, 2);
  };

  // JSON to XML
  const jsonToXml = (jsonStr: string): string => {
    const data = JSON.parse(jsonStr);

    const buildXml = (obj: any, rootName: string = "root"): string => {
      if (typeof obj !== "object" || obj === null) {
        return `<${rootName}>${obj}</${rootName}>`;
      }

      if (Array.isArray(obj)) {
        return obj.map((item) => buildXml(item, "item")).join("\n");
      }

      let xml = `<${rootName}>`;
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object" && value !== null) {
          xml += buildXml(value, key);
        } else {
          xml += `<${key}>${value}</${key}>`;
        }
      }
      xml += `</${rootName}>`;

      return xml;
    };

    return buildXml(data);
  };

  const convert = async () => {
    try {
      setError("");
      if (!input.trim()) {
        setError("Please enter data to convert");
        return;
      }

      if (fromFormat === toFormat) {
        setOutput(input);
        return;
      }

      let result = "";

      // Handle conversions
      if (fromFormat === "json" && toFormat === "yaml") {
        const parsed = JSON.parse(input);
        result = yaml.dump(parsed, { indent: 2 });
      } else if (fromFormat === "yaml" && toFormat === "json") {
        const parsed = yaml.load(input);
        result = JSON.stringify(parsed, null, 2);
      } else if (fromFormat === "json" && toFormat === "xml") {
        result = jsonToXml(input);
      } else if (fromFormat === "xml" && toFormat === "json") {
        result = xmlToJson(input);
      } else if (fromFormat === "json" && toFormat === "csv") {
        result = jsonToCsv(input);
      } else if (fromFormat === "csv" && toFormat === "json") {
        result = csvToJson(input);
      } else if (fromFormat === "markdown" && toFormat === "html") {
        result = await marked(input);
      } else if (fromFormat === "text" && toFormat === "base64") {
        result = btoa(input);
      } else if (fromFormat === "base64" && toFormat === "text") {
        result = atob(input);
      } else if (fromFormat === "json" && toFormat === "text") {
        const parsed = JSON.parse(input);
        result = JSON.stringify(parsed, null, 2);
      } else if (fromFormat === "yaml" && toFormat === "text") {
        result = input;
      } else if (fromFormat === "xml" && toFormat === "text") {
        result = input;
      } else if (toFormat === "text") {
        result = input;
      } else {
        throw new Error(`Conversion from ${fromFormat} to ${toFormat} is not supported yet`);
      }

      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
      setOutput("");
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
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${toFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Universal Data Converter</h1>
        <p className="text-muted-foreground">Convert between multiple data formats with ease</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Conversion Options</CardTitle>
          <CardDescription>Select source and target formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-format">From</Label>
              <Select value={fromFormat} onValueChange={(value) => setFromFormat(value as FormatType)}>
                <SelectTrigger id="from-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-format">To</Label>
              <Select value={toFormat} onValueChange={(value) => setToFormat(value as FormatType)}>
                <SelectTrigger id="to-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter your {formats.find((f) => f.value === fromFormat)?.label} data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder={`Paste your ${formats.find((f) => f.value === fromFormat)?.label} here...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 resize-none min-h-[400px]"
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Converted {formats.find((f) => f.value === toFormat)?.label} data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Converted output will appear here..."
              value={output}
              readOnly
              className="font-mono flex-1 resize-none min-h-[400px]"
            />
            {output && (
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

      <div className="flex gap-4">
        <Button onClick={convert} className="flex-1" size="lg">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Convert
        </Button>
        <Button onClick={clearAll} variant="outline" size="lg">
          Clear All
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Supported Conversions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Direct Conversions:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• JSON ↔ YAML</li>
              <li>• JSON ↔ XML</li>
              <li>• JSON ↔ CSV</li>
              <li>• Markdown → HTML</li>
              <li>• Text ↔ Base64</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tips:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• CSV to JSON requires headers in first row</li>
              <li>• JSON to CSV requires array of objects</li>
              <li>• XML parsing preserves attributes</li>
              <li>• Base64 encoding/decoding is UTF-8</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
