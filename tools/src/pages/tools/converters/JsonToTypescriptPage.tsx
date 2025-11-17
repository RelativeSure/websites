import { ArrowRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JsonToTypescript() {
  const [json, setJson] = useState("");
  const [interfaceName, setInterfaceName] = useState("MyInterface");
  const [typescript, setTypescript] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const getType = (value: any): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) {
      if (value.length === 0) return "any[]";
      const firstType = getType(value[0]);
      return `${firstType}[]`;
    }
    if (typeof value === "object") return "object";
    return typeof value;
  };

  const jsonToInterface = (obj: any, name: string, indent: number = 0): string => {
    const indentation = "  ".repeat(indent);
    let result = `${indentation}interface ${name} {\n`;

    for (const [key, value] of Object.entries(obj)) {
      const type = getType(value);

      if (type === "object" && value !== null) {
        const subInterfaceName = key.charAt(0).toUpperCase() + key.slice(1);
        result += jsonToInterface(value, subInterfaceName, indent + 1);
        result += `${indentation}  ${key}: ${subInterfaceName};\n`;
      } else if (type.includes("[]")) {
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
          const subInterfaceName = key.charAt(0).toUpperCase() + key.slice(1, -1);
          result += jsonToInterface(value[0], subInterfaceName, indent + 1);
          result += `${indentation}  ${key}: ${subInterfaceName}[];\n`;
        } else {
          result += `${indentation}  ${key}: ${type};\n`;
        }
      } else {
        result += `${indentation}  ${key}: ${type};\n`;
      }
    }

    result += `${indentation}}\n\n`;
    return result;
  };

  const convert = () => {
    if (!json.trim()) {
      setTypescript("");
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(json);
      const result = jsonToInterface(parsed, interfaceName || "MyInterface");
      setTypescript(result.trim());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setTypescript("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(typescript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON to TypeScript</h1>
        <p className="text-muted-foreground">Convert JSON to TypeScript interfaces</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>JSON Input</CardTitle>
            <CardDescription>Enter JSON to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <div className="space-y-2">
              <Label htmlFor="interfaceName">Interface Name</Label>
              <Input
                id="interfaceName"
                value={interfaceName}
                onChange={(e) => setInterfaceName(e.target.value)}
                placeholder="MyInterface"
                className="font-mono"
              />
            </div>

            <Textarea
              placeholder='{"name": "John", "age": 30}'
              value={json}
              onChange={(e) => setJson(e.target.value)}
              className="font-mono flex-1 resize-none text-sm"
            />

            <Button onClick={convert} className="w-full">
              <ArrowRight className="mr-2 w-4 h-4" />
              Convert to TypeScript
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
            <CardTitle>TypeScript Output</CardTitle>
            <CardDescription>Generated TypeScript interfaces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="TypeScript interfaces will appear here..."
              value={typescript}
              readOnly
              className="font-mono flex-1 resize-none text-sm"
            />
            <Button onClick={copyToClipboard} disabled={!typescript} variant="outline" className="w-full">
              {copied ? (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-4 h-4" />
                  Copy TypeScript
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
