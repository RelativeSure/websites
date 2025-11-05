"use client";

import { useState } from "react";
import { Check, X, Minimize2, Maximize2 } from "lucide-react";
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

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
      setIsValid(false);
    }
  };

  const minifyJson = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
      setIsValid(false);
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      setIsValid(true);
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : String(err)}`);
      setIsValid(false);
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON Formatter & Validator</h1>
        <p className="text-muted-foreground">
          Format, validate, and minify JSON data
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {isValid === true && !error && (
        <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 flex items-center gap-2">
          <Check className="w-4 h-4" />
          Valid JSON
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Paste your JSON here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='{"key": "value"}'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsValid(null);
                setError("");
              }}
              className="font-mono min-h-[400px]"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={formatJson}>
                <Maximize2 className="mr-2 w-4 h-4" />
                Format
              </Button>
              <Button onClick={minifyJson}>
                <Minimize2 className="mr-2 w-4 h-4" />
                Minify
              </Button>
              <Button onClick={validateJson} variant="outline">
                {isValid === true ? (
                  <Check className="mr-2 w-4 h-4" />
                ) : isValid === false ? (
                  <X className="mr-2 w-4 h-4" />
                ) : null}
                Validate
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Formatted or minified JSON</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="font-mono min-h-[400px]"
              placeholder="Output will appear here..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
