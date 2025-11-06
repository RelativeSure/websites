import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight, Copy, Check } from "lucide-react";

type BaseType = "text" | "base64" | "base64url" | "base32" | "hex" | "binary";

interface BaseOption {
  value: BaseType;
  label: string;
}

const baseOptions: BaseOption[] = [
  { value: "text", label: "Text (UTF-8)" },
  { value: "base64", label: "Base64" },
  { value: "base64url", label: "Base64 URL Safe" },
  { value: "base32", label: "Base32" },
  { value: "hex", label: "Hexadecimal" },
  { value: "binary", label: "Binary" },
];

export default function BaseConversionPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fromBase, setFromBase] = useState<BaseType>("text");
  const [toBase, setToBase] = useState<BaseType>("base64");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Base64 URL Safe encoding/decoding
  const base64ToBase64Url = (str: string): string => {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const base64UrlToBase64 = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return base64;
  };

  // Base32 encoding/decoding (RFC 4648)
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

    // Add padding
    while (result.length % 8) {
      result += "=";
    }

    return result;
  };

  const base32ToText = (base32: string): string => {
    // Remove padding
    base32 = base32.replace(/=/g, "");

    let bits = "";
    for (const char of base32.toUpperCase()) {
      const index = base32Alphabet.indexOf(char);
      if (index === -1) {
        throw new Error(`Invalid Base32 character: ${char}`);
      }
      bits += index.toString(2).padStart(5, "0");
    }

    const bytes: number[] = [];
    for (let i = 0; i < bits.length - 7; i += 8) {
      bytes.push(parseInt(bits.slice(i, i + 8), 2));
    }

    return new TextDecoder().decode(new Uint8Array(bytes));
  };

  // Convert from any base to text
  const toText = (value: string, from: BaseType): string => {
    switch (from) {
      case "text":
        return value;
      case "base64":
        return atob(value);
      case "base64url":
        return atob(base64UrlToBase64(value));
      case "base32":
        return base32ToText(value);
      case "hex":
        return decodeURIComponent(
          value.replace(/\s/g, "").replace(/(.{2})/g, "%$1")
        );
      case "binary":
        const binary = value.replace(/\s/g, "");
        if (!/^[01]+$/.test(binary)) {
          throw new Error("Invalid binary string");
        }
        const bytes: number[] = [];
        for (let i = 0; i < binary.length; i += 8) {
          bytes.push(parseInt(binary.slice(i, i + 8), 2));
        }
        return new TextDecoder().decode(new Uint8Array(bytes));
      default:
        throw new Error("Unsupported base");
    }
  };

  // Convert from text to any base
  const fromText = (text: string, to: BaseType): string => {
    switch (to) {
      case "text":
        return text;
      case "base64":
        return btoa(text);
      case "base64url":
        return base64ToBase64Url(btoa(text));
      case "base32":
        return textToBase32(text);
      case "hex":
        return Array.from(new TextEncoder().encode(text))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      case "binary":
        return Array.from(new TextEncoder().encode(text))
          .map((b) => b.toString(2).padStart(8, "0"))
          .join(" ");
      default:
        throw new Error("Unsupported base");
    }
  };

  const handleConvert = () => {
    try {
      setError("");
      if (!input.trim()) {
        setOutput("");
        return;
      }

      // Convert: input -> text -> output
      const text = toText(input, fromBase);
      const result = fromText(text, toBase);
      setOutput(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Conversion failed. Please check your input."
      );
      setOutput("");
    }
  };

  const handleSwap = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);
    setInput(output);
    setOutput(input);
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

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Base Conversion</h1>
        <p className="text-muted-foreground">
          Convert between different encoding formats: Text, Base64, Base32, Hex, and Binary
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dropdowns Row */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="from-base">From</Label>
              <Select value={fromBase} onValueChange={(value) => setFromBase(value as BaseType)}>
                <SelectTrigger id="from-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="mb-0"
              title="Swap bases"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="to-base">To</Label>
              <Select value={toBase} onValueChange={(value) => setToBase(value as BaseType)}>
                <SelectTrigger id="to-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {baseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter ${baseOptions.find((o) => o.value === fromBase)?.label} here...`}
              className="font-mono min-h-[150px]"
            />
          </div>

          {/* Convert Button */}
          <Button onClick={handleConvert} className="w-full">
            Convert
          </Button>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">Output</Label>
              {output && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8"
                >
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
            <Textarea
              id="output"
              value={output}
              readOnly
              placeholder="Converted output will appear here..."
              className="font-mono min-h-[150px] bg-muted"
            />
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium">Text to Base64:</p>
            <p className="text-sm text-muted-foreground font-mono">
              "Hello World" → "SGVsbG8gV29ybGQ="
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Base64 to Base32:</p>
            <p className="text-sm text-muted-foreground font-mono">
              "SGVsbG8gV29ybGQ=" → "JBSWY3DPEBLW64TMMQQQ===="
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Text to Hex:</p>
            <p className="text-sm text-muted-foreground font-mono">
              "Hello" → "48656c6c6f"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
