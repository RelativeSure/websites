"use client";

import { useState } from "react";
import { Type } from "lucide-react";
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

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toCamelCase = () => {
    const result = input
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
    setOutput(result);
  };

  const toPascalCase = () => {
    const result = input
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
      .replace(/\s+/g, "");
    setOutput(result);
  };

  const toSnakeCase = () => {
    const result = input
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_");
    setOutput(result);
  };

  const toKebabCase = () => {
    const result = input
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-");
    setOutput(result);
  };

  const toUpperCase = () => {
    setOutput(input.toUpperCase());
  };

  const toLowerCase = () => {
    setOutput(input.toLowerCase());
  };

  const toTitleCase = () => {
    const result = input.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    setOutput(result);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Case Converter</h1>
        <p className="text-muted-foreground">
          Convert text between different case formats
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>Enter text to convert</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px]"
          />
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-3 mb-6">
        <Button onClick={toCamelCase} variant="outline">
          camelCase
        </Button>
        <Button onClick={toPascalCase} variant="outline">
          PascalCase
        </Button>
        <Button onClick={toSnakeCase} variant="outline">
          snake_case
        </Button>
        <Button onClick={toKebabCase} variant="outline">
          kebab-case
        </Button>
        <Button onClick={toUpperCase} variant="outline">
          UPPERCASE
        </Button>
        <Button onClick={toLowerCase} variant="outline">
          lowercase
        </Button>
        <Button onClick={toTitleCase} variant="outline" className="md:col-span-3">
          Title Case
        </Button>
      </div>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] font-mono"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
