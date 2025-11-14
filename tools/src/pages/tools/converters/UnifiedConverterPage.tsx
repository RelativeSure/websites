import yaml from "js-yaml";
import { marked } from "marked";
import { ArrowLeftRight, Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormatType =
  | "json"
  | "yaml"
  | "xml"
  | "csv"
  | "base64"
  | "base32"
  | "hex"
  | "binary"
  | "octal"
  | "decimal"
  | "markdown"
  | "html"
  | "text"
  | "url"
  | "html-entities";

interface ConversionFormat {
  value: FormatType;
  label: string;
  category: "data" | "base" | "encoding";
}

const formats: ConversionFormat[] = [
  // Data Formats
  { value: "json", label: "JSON", category: "data" },
  { value: "yaml", label: "YAML", category: "data" },
  { value: "xml", label: "XML", category: "data" },
  { value: "csv", label: "CSV", category: "data" },
  { value: "markdown", label: "Markdown", category: "data" },
  { value: "html", label: "HTML", category: "data" },
  { value: "text", label: "Plain Text", category: "data" },

  // Base Encodings
  { value: "base64", label: "Base64", category: "base" },
  { value: "base32", label: "Base32", category: "base" },
  { value: "hex", label: "Hexadecimal", category: "base" },
  { value: "binary", label: "Binary", category: "base" },
  { value: "octal", label: "Octal", category: "base" },
  { value: "decimal", label: "Decimal", category: "base" },

  // Encodings
  { value: "url", label: "URL Encoded", category: "encoding" },
  { value: "html-entities", label: "HTML Entities", category: "encoding" },
];

export default function UnifiedConverterPage() {
  const [fromFormat, setFromFormat] = useState<FormatType>("json");
  const [toFormat, setToFormat] = useState<FormatType>("yaml");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Define which formats can convert to which
  const getCompatibleFormats = (from: FormatType): FormatType[] => {
    const baseEncodings: FormatType[] = ["base64", "base32", "hex", "binary", "octal", "decimal"];
    const dataFormats: FormatType[] = ["json", "yaml", "xml", "csv"];

    switch (from) {
      case "json":
        return ["yaml", "xml", "csv", "text"];
      case "yaml":
        return ["json", "xml", "csv", "text"];
      case "xml":
        return ["json", "yaml", "csv", "text"];
      case "csv":
        return ["json", "yaml", "xml", "text"];
      case "markdown":
        return ["html", "text"];
      case "html":
        return ["text"];
      case "text":
        return [
          "json",
          "yaml",
          "xml",
          "csv",
          "markdown",
          "html",
          "base64",
          "base32",
          "hex",
          "binary",
          "octal",
          "decimal",
          "url",
          "html-entities",
        ];
      case "base64":
      case "base32":
      case "hex":
      case "binary":
      case "octal":
      case "decimal":
        return ["text", ...baseEncodings.filter((b) => b !== from)];
      case "url":
      case "html-entities":
        return ["text"];
      default:
        return [];
    }
  };

  // Get available formats for the current selection
  const availableToFormats = getCompatibleFormats(fromFormat);

  // Auto-adjust toFormat if it becomes incompatible
  const handleFromFormatChange = (newFrom: FormatType) => {
    setFromFormat(newFrom);
    const compatible = getCompatibleFormats(newFrom);
    if (!compatible.includes(toFormat)) {
      // Set to first compatible format
      setToFormat(compatible[0] || "text");
    }
  };

  // Base Conversion Utilities
  const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  const textToBase32 = (text: string): string => {
    const bytes = new TextEncoder().encode(text);
    let bits = "";
    for (const byte of bytes) {
      bits += byte.toString(2).padStart(8, "0");
    }
    let result = "";
    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.slice(i, i + 5).padEnd(5, "0");
      result += base32Alphabet[parseInt(chunk, 2)];
    }
    const padding = (8 - (result.length % 8)) % 8;
    return result + "=".repeat(padding);
  };

  const base32ToText = (encoded: string): string => {
    const cleaned = encoded.replace(/=+$/, "");
    let bits = "";
    for (const char of cleaned) {
      const index = base32Alphabet.indexOf(char.toUpperCase());
      if (index === -1) throw new Error("Invalid Base32 character");
      bits += index.toString(2).padStart(5, "0");
    }
    const bytes: number[] = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.slice(i, i + 8), 2));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  const textToHex = (text: string): string => {
    return Array.from(new TextEncoder().encode(text))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const hexToText = (hex: string): string => {
    const cleaned = hex.replace(/\s/g, "");
    if (cleaned.length % 2 !== 0) throw new Error("Invalid hexadecimal string");
    const bytes: number[] = [];
    for (let i = 0; i < cleaned.length; i += 2) {
      bytes.push(parseInt(cleaned.slice(i, i + 2), 16));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  const textToBinary = (text: string): string => {
    return Array.from(new TextEncoder().encode(text))
      .map((byte) => byte.toString(2).padStart(8, "0"))
      .join(" ");
  };

  const binaryToText = (binary: string): string => {
    const cleaned = binary.replace(/\s/g, "");
    if (cleaned.length % 8 !== 0) throw new Error("Invalid binary string");
    const bytes: number[] = [];
    for (let i = 0; i < cleaned.length; i += 8) {
      bytes.push(parseInt(cleaned.slice(i, i + 8), 2));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  const textToOctal = (text: string): string => {
    return Array.from(new TextEncoder().encode(text))
      .map((byte) => byte.toString(8).padStart(3, "0"))
      .join(" ");
  };

  const octalToText = (octal: string): string => {
    const cleaned = octal.replace(/\s/g, "");
    const bytes: number[] = [];
    for (let i = 0; i < cleaned.length; i += 3) {
      bytes.push(parseInt(cleaned.slice(i, i + 3), 8));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  const textToDecimal = (text: string): string => {
    return Array.from(new TextEncoder().encode(text))
      .map((byte) => byte.toString(10))
      .join(" ");
  };

  const decimalToText = (decimal: string): string => {
    const bytes = decimal
      .trim()
      .split(/\s+/)
      .map((n) => parseInt(n, 10));
    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  // URL Encoding
  const encodeUrl = (text: string): string => {
    return encodeURIComponent(text);
  };

  const decodeUrl = (encoded: string): string => {
    return decodeURIComponent(encoded);
  };

  // HTML Entities
  const encodeHtmlEntities = (text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  // HTML to Text
  const htmlToText = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // XML to YAML
  const xmlToYaml = (xmlStr: string): string => {
    const jsonStr = xmlToJson(xmlStr);
    const parsed = JSON.parse(jsonStr);
    return yaml.dump(parsed, { indent: 2 });
  };

  // YAML to XML
  const yamlToXml = (yamlStr: string): string => {
    const parsed = yaml.load(yamlStr);
    const jsonStr = JSON.stringify(parsed);
    return jsonToXml(jsonStr);
  };

  // CSV to YAML
  const csvToYaml = (csvStr: string): string => {
    const jsonStr = csvToJson(csvStr);
    const parsed = JSON.parse(jsonStr);
    return yaml.dump(parsed, { indent: 2 });
  };

  // YAML to CSV
  const yamlToCsv = (yamlStr: string): string => {
    const parsed = yaml.load(yamlStr);
    const jsonStr = JSON.stringify(parsed);
    return jsonToCsv(jsonStr);
  };

  // XML to CSV
  const xmlToCsv = (xmlStr: string): string => {
    const jsonStr = xmlToJson(xmlStr);
    return jsonToCsv(jsonStr);
  };

  // CSV to XML
  const csvToXml = (csvStr: string): string => {
    const jsonStr = csvToJson(csvStr);
    return jsonToXml(jsonStr);
  };

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

      // Data format conversions
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
      } else if (fromFormat === "xml" && toFormat === "yaml") {
        result = xmlToYaml(input);
      } else if (fromFormat === "yaml" && toFormat === "xml") {
        result = yamlToXml(input);
      } else if (fromFormat === "json" && toFormat === "csv") {
        result = jsonToCsv(input);
      } else if (fromFormat === "csv" && toFormat === "json") {
        result = csvToJson(input);
      } else if (fromFormat === "csv" && toFormat === "yaml") {
        result = csvToYaml(input);
      } else if (fromFormat === "yaml" && toFormat === "csv") {
        result = yamlToCsv(input);
      } else if (fromFormat === "xml" && toFormat === "csv") {
        result = xmlToCsv(input);
      } else if (fromFormat === "csv" && toFormat === "xml") {
        result = csvToXml(input);
      } else if (fromFormat === "markdown" && toFormat === "html") {
        result = await marked(input);
      } else if (fromFormat === "html" && toFormat === "text") {
        result = htmlToText(input);
      } else if (fromFormat === "json" && toFormat === "text") {
        const parsed = JSON.parse(input);
        result = JSON.stringify(parsed, null, 2);
      } else if (fromFormat === "yaml" && toFormat === "text") {
        result = input;
      } else if (fromFormat === "xml" && toFormat === "text") {
        result = input;
      } else if (fromFormat === "csv" && toFormat === "text") {
        result = input;
      } else if (fromFormat === "markdown" && toFormat === "text") {
        result = input;
      }
      // Base64 conversions
      else if (fromFormat === "text" && toFormat === "base64") {
        result = btoa(input);
      } else if (fromFormat === "base64" && toFormat === "text") {
        result = atob(input);
      }
      // Base32 conversions
      else if (fromFormat === "text" && toFormat === "base32") {
        result = textToBase32(input);
      } else if (fromFormat === "base32" && toFormat === "text") {
        result = base32ToText(input);
      }
      // Hexadecimal conversions
      else if (fromFormat === "text" && toFormat === "hex") {
        result = textToHex(input);
      } else if (fromFormat === "hex" && toFormat === "text") {
        result = hexToText(input);
      }
      // Binary conversions
      else if (fromFormat === "text" && toFormat === "binary") {
        result = textToBinary(input);
      } else if (fromFormat === "binary" && toFormat === "text") {
        result = binaryToText(input);
      }
      // Octal conversions
      else if (fromFormat === "text" && toFormat === "octal") {
        result = textToOctal(input);
      } else if (fromFormat === "octal" && toFormat === "text") {
        result = octalToText(input);
      }
      // Decimal conversions
      else if (fromFormat === "text" && toFormat === "decimal") {
        result = textToDecimal(input);
      } else if (fromFormat === "decimal" && toFormat === "text") {
        result = decimalToText(input);
      }
      // URL encoding conversions
      else if (fromFormat === "text" && toFormat === "url") {
        result = encodeUrl(input);
      } else if (fromFormat === "url" && toFormat === "text") {
        result = decodeUrl(input);
      }
      // HTML entities conversions
      else if (fromFormat === "text" && toFormat === "html-entities") {
        result = encodeHtmlEntities(input);
      } else if (fromFormat === "html-entities" && toFormat === "text") {
        result = decodeHtmlEntities(input);
      }
      // Base to base conversions (through text)
      else if (
        ["base64", "base32", "hex", "binary", "octal", "decimal"].includes(fromFormat) &&
        ["base64", "base32", "hex", "binary", "octal", "decimal"].includes(toFormat)
      ) {
        // Convert from source base to text first
        let intermediate = input;
        if (fromFormat === "base64") intermediate = atob(input);
        else if (fromFormat === "base32") intermediate = base32ToText(input);
        else if (fromFormat === "hex") intermediate = hexToText(input);
        else if (fromFormat === "binary") intermediate = binaryToText(input);
        else if (fromFormat === "octal") intermediate = octalToText(input);
        else if (fromFormat === "decimal") intermediate = decimalToText(input);

        // Convert from text to target base
        if (toFormat === "base64") result = btoa(intermediate);
        else if (toFormat === "base32") result = textToBase32(intermediate);
        else if (toFormat === "hex") result = textToHex(intermediate);
        else if (toFormat === "binary") result = textToBinary(intermediate);
        else if (toFormat === "octal") result = textToOctal(intermediate);
        else if (toFormat === "decimal") result = textToDecimal(intermediate);
      }
      // Convert to text (for display purposes)
      else if (toFormat === "text") {
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
              <Select value={fromFormat} onValueChange={(value) => handleFromFormatChange(value as FormatType)}>
                <SelectTrigger id="from-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Data Formats</div>
                  {formats
                    .filter((f) => f.category === "data")
                    .map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Base Encodings</div>
                  {formats
                    .filter((f) => f.category === "base")
                    .map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">String Encodings</div>
                  {formats
                    .filter((f) => f.category === "encoding")
                    .map((format) => (
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
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Data Formats</div>
                  {formats
                    .filter((f) => f.category === "data" && availableToFormats.includes(f.value))
                    .map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Base Encodings</div>
                  {formats
                    .filter((f) => f.category === "base" && availableToFormats.includes(f.value))
                    .map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">String Encodings</div>
                  {formats
                    .filter((f) => f.category === "encoding" && availableToFormats.includes(f.value))
                    .map((format) => (
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
          <CardTitle>Available Conversions from {formats.find((f) => f.value === fromFormat)?.label}</CardTitle>
          <CardDescription>
            Select a format above to see compatible conversion targets. The "To" dropdown shows only valid conversions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm">Can convert to:</h4>
              <div className="flex flex-wrap gap-2">
                {availableToFormats.map((format) => {
                  const formatInfo = formats.find((f) => f.value === format);
                  return (
                    <span
                      key={format}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {formatInfo?.label}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h4 className="font-semibold mb-2 text-sm">All Data Format Conversions:</h4>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>• JSON ↔ YAML, XML, CSV</li>
                  <li>• YAML ↔ JSON, XML, CSV</li>
                  <li>• XML ↔ JSON, YAML, CSV</li>
                  <li>• CSV ↔ JSON, YAML, XML</li>
                  <li>• Markdown → HTML</li>
                  <li>• HTML → Text</li>
                  <li>• Any data format → Text</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">All Encoding Conversions:</h4>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>• Text ↔ Base64, Base32, Hex, Binary, Octal, Decimal</li>
                  <li>• Text ↔ URL Encoded, HTML Entities</li>
                  <li>• Any base encoding ↔ Any other base encoding</li>
                  <li>• Example: Hex ↔ Base64, Binary ↔ Base32, etc.</li>
                </ul>
                <h4 className="font-semibold mb-2 mt-3 text-sm">Tips:</h4>
                <ul className="space-y-1 text-muted-foreground text-xs">
                  <li>• CSV requires headers in first row</li>
                  <li>• JSON to CSV needs array of objects</li>
                  <li>• Base encodings convert via text intermediary</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
