import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft, Copy, Check } from "lucide-react";

export default function XmlToYamlPage() {
  const [xml, setXml] = useState("");
  const [yaml, setYaml] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const parseXml = (xmlString: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error("Invalid XML");
    }

    const xmlToObject = (node: Element): any => {
      const obj: any = {};

      // Handle attributes
      if (node.attributes.length > 0) {
        obj["@attributes"] = {};
        Array.from(node.attributes).forEach((attr) => {
          obj["@attributes"][attr.name] = attr.value;
        });
      }

      // Handle child nodes
      const children = Array.from(node.childNodes);
      const textNodes = children.filter(
        (child) => child.nodeType === Node.TEXT_NODE && child.textContent?.trim()
      );
      const elementNodes = children.filter((child) => child.nodeType === Node.ELEMENT_NODE);

      // If only text content
      if (textNodes.length > 0 && elementNodes.length === 0) {
        const text = textNodes.map((n) => n.textContent?.trim()).join(" ");
        if (obj["@attributes"]) {
          obj["#text"] = text;
        } else {
          return text;
        }
      }

      // Process element children
      elementNodes.forEach((child) => {
        const childElement = child as Element;
        const childName = childElement.tagName;
        const childValue = xmlToObject(childElement);

        if (obj[childName]) {
          // Convert to array if multiple elements with same name
          if (Array.isArray(obj[childName])) {
            obj[childName].push(childValue);
          } else {
            obj[childName] = [obj[childName], childValue];
          }
        } else {
          obj[childName] = childValue;
        }
      });

      return obj;
    };

    return xmlToObject(xmlDoc.documentElement);
  };

  const objectToYaml = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent);
    let yaml = "";

    if (obj === null || obj === undefined) {
      return "null";
    }

    if (typeof obj === "string") {
      // Quote strings with special characters
      if (obj.includes(":") || obj.includes("\n") || obj.includes("#")) {
        return `"${obj.replace(/"/g, '\\"')}"`;
      }
      return obj;
    }

    if (typeof obj === "number" || typeof obj === "boolean") {
      return String(obj);
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      obj.forEach((item) => {
        yaml += `\n${spaces}- ${objectToYaml(item, indent + 1).replace(/^\s+/, "")}`;
      });
      return yaml;
    }

    if (typeof obj === "object") {
      const keys = Object.keys(obj);
      if (keys.length === 0) return "{}";

      keys.forEach((key, index) => {
        const value = obj[key];
        const yamlValue = objectToYaml(value, indent + 1);

        if (typeof value === "object" && !Array.isArray(value) && value !== null) {
          yaml += `${index > 0 || indent > 0 ? "\n" : ""}${spaces}${key}:${
            yamlValue.startsWith("\n") ? "" : " "
          }${yamlValue}`;
        } else if (Array.isArray(value)) {
          yaml += `${index > 0 || indent > 0 ? "\n" : ""}${spaces}${key}:${yamlValue}`;
        } else {
          yaml += `${index > 0 || indent > 0 ? "\n" : ""}${spaces}${key}: ${yamlValue}`;
        }
      });
      return yaml;
    }

    return String(obj);
  };

  const convert = () => {
    setError("");
    setYaml("");

    if (!xml.trim()) {
      setError("Please enter XML to convert");
      return;
    }

    try {
      const obj = parseXml(xml);
      const yamlOutput = objectToYaml(obj);
      setYaml(yamlOutput.trim());
    } catch (err) {
      setError("Failed to convert XML: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title lang="en">Harry Potter</title>
    <author>J.K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="programming">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>`;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">XML to YAML Converter</h1>
        <p className="text-muted-foreground">
          Convert XML data to YAML format
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>XML Input</CardTitle>
            <CardDescription>
              Enter your XML data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={xml}
              onChange={(e) => setXml(e.target.value)}
              placeholder="<?xml version='1.0'?>&#10;<root>...</root>"
              className="font-mono text-sm min-h-[400px]"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setXml(exampleXml)}
            >
              Load Example
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>YAML Output</CardTitle>
                <CardDescription>
                  Converted YAML data
                </CardDescription>
              </div>
              {yaml && (
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
              value={yaml}
              readOnly
              placeholder="YAML output will appear here..."
              className="font-mono text-sm min-h-[400px] bg-muted"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mb-6">
        <Button onClick={convert} size="lg">
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Convert to YAML
        </Button>
      </div>

      {error && (
        <Card className="border-destructive mb-6">
          <CardContent className="pt-6">
            <div className="text-destructive text-sm">{error}</div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Conversion Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This tool converts XML documents to YAML format while preserving structure
            and data.
          </p>
          <div>
            <strong>Conversion rules:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>XML elements become YAML keys</li>
              <li>Element text content becomes values</li>
              <li>XML attributes are stored under "@attributes"</li>
              <li>Multiple elements with the same name become YAML arrays</li>
              <li>Text content with attributes is stored under "#text"</li>
            </ul>
          </div>
          <p>
            <strong>Use cases:</strong> Configuration file conversion, data migration,
            API response transformation, and format standardization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
