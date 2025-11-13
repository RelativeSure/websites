import { ArrowLeftRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

  // Base32 encoding/decoding (RFC 4648)
  const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  // Convert from any base to raw bytes (Uint8Array)
  const toBytes = (value: string, from: BaseType): Uint8Array => {
    switch (from) {
      case "text":
        return new TextEncoder().encode(value);

      case "base64": {
        const binaryString = atob(value);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      }

      case "base64url": {
        // Convert base64url to standard base64
        let base64 = value.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) {
          base64 += "=";
        }
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      }

      case "base32": {
        // Remove padding
        const cleanBase32 = value.replace(/=/g, "");

        let bits = "";
        for (const char of cleanBase32.toUpperCase()) {
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

        return new Uint8Array(bytes);
      }

      case "hex": {
        const hex = value.replace(/\s/g, "");
        if (!/^[0-9a-fA-F]*$/.test(hex)) {
          throw new Error("Invalid hexadecimal string");
        }
        if (hex.length % 2 !== 0) {
          throw new Error("Hexadecimal string must have even length");
        }

        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
        return bytes;
      }

      case "binary": {
        const binary = value.replace(/\s/g, "");
        if (!/^[01]+$/.test(binary)) {
          throw new Error("Invalid binary string");
        }

        const bytes: number[] = [];
        for (let i = 0; i < binary.length; i += 8) {
          const byte = binary.slice(i, i + 8).padEnd(8, "0");
          bytes.push(parseInt(byte, 2));
        }
        return new Uint8Array(bytes);
      }

      default:
        throw new Error("Unsupported base");
    }
  };

  // Convert from raw bytes (Uint8Array) to any base
  const fromBytes = (bytes: Uint8Array, to: BaseType): string => {
    switch (to) {
      case "text":
        return new TextDecoder().decode(bytes);

      case "base64": {
        let binaryString = "";
        for (let i = 0; i < bytes.length; i++) {
          binaryString += String.fromCharCode(bytes[i]);
        }
        return btoa(binaryString);
      }

      case "base64url": {
        let binaryString = "";
        for (let i = 0; i < bytes.length; i++) {
          binaryString += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binaryString);
        return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
      }

      case "base32": {
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
      }

      case "hex":
        return Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      case "binary":
        return Array.from(bytes)
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

      // Convert: input -> bytes -> output
      const bytes = toBytes(input, fromBase);
      const result = fromBytes(bytes, toBase);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please check your input.");
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

            <Button variant="outline" size="icon" onClick={handleSwap} className="mb-0" title="Swap bases">
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
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
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
            <p className="text-sm text-muted-foreground font-mono">"Hello World" → "SGVsbG8gV29ybGQ="</p>
          </div>
          <div>
            <p className="text-sm font-medium">Base64 to Hex (binary data preserved):</p>
            <p className="text-sm text-muted-foreground font-mono">"/w==" (0xFF byte) → "ff"</p>
          </div>
          <div>
            <p className="text-sm font-medium">Base64 to Base32:</p>
            <p className="text-sm text-muted-foreground font-mono">"SGVsbG8gV29ybGQ=" → "JBSWY3DPEBLW64TMMQQQ===="</p>
          </div>
          <div>
            <p className="text-sm font-medium">Text to Hex:</p>
            <p className="text-sm text-muted-foreground font-mono">"Hello" → "48656c6c6f"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
