import { ArrowRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function XmlJsonConverter() {
  const [xml, setXml] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const xmlToJson = (xmlStr: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Invalid XML");
    }

    const parseNode = (node: Element): any => {
      const obj: any = {};

      // Handle attributes
      if (node.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj["@attributes"][attr.name] = attr.value;
        }
      }

      // Handle child nodes
      const children = Array.from(node.childNodes);

      // If only text content
      if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
        const text = children[0].textContent?.trim();
        if (text) {
          return obj["@attributes"] ? { ...obj, "#text": text } : text;
        }
        return obj["@attributes"] || {};
      }

      // Handle element children
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

    return parseNode(xmlDoc.documentElement);
  };

  const convertToJson = () => {
    if (!xml.trim()) {
      setJson("");
      setError("");
      return;
    }

    try {
      const result = xmlToJson(xml);
      const formatted = JSON.stringify(result, null, 2);
      setJson(formatted);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid XML");
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
        <h1 className="text-3xl font-bold mb-2">XML to JSON Converter</h1>
        <p className="text-muted-foreground">Convert XML to JSON format</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>XML Input</CardTitle>
            <CardDescription>Enter XML to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="<root>&#10;  <item>value</item>&#10;</root>"
              value={xml}
              onChange={(e) => setXml(e.target.value)}
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
            <CardDescription>Converted JSON</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="JSON output will appear here..."
              value={json}
              readOnly
              className="font-mono flex-1 resize-none"
            />
            <Button onClick={copyToClipboard} disabled={!json} variant="outline" className="w-full">
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
