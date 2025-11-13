"use client";

import yaml from "js-yaml";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JsonYamlConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [yamlInput, setYamlInput] = useState("");
  const [error, setError] = useState("");

  const jsonToYaml = () => {
    try {
      setError("");
      const parsed = JSON.parse(jsonInput);
      const yamlOutput = yaml.dump(parsed, { indent: 2 });
      setYamlInput(yamlOutput);
    } catch (err) {
      setError(`Error converting JSON to YAML: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const yamlToJson = () => {
    try {
      setError("");
      const parsed = yaml.load(yamlInput);
      const jsonOutput = JSON.stringify(parsed, null, 2);
      setJsonInput(jsonOutput);
    } catch (err) {
      setError(`Error converting YAML to JSON: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setYamlInput("");
    setError("");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON ⟷ YAML Converter</h1>
        <p className="text-muted-foreground">Convert between JSON and YAML formats with syntax validation</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>JSON</CardTitle>
            <CardDescription>Paste your JSON here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder='{"key": "value"}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="font-mono min-h-[400px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={jsonToYaml} className="flex-1">
                Convert to YAML
                <ArrowLeftRight className="ml-2 w-4 h-4" />
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>YAML</CardTitle>
            <CardDescription>Paste your YAML here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="key: value"
                value={yamlInput}
                onChange={(e) => setYamlInput(e.target.value)}
                className="font-mono min-h-[400px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={yamlToJson} className="flex-1">
                Convert to JSON
                <ArrowLeftRight className="ml-2 w-4 h-4" />
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
