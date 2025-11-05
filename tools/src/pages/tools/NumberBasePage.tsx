import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BaseType = "2" | "8" | "10" | "16" | "32" | "36" | "64";

const BASE_OPTIONS = [
  { value: "2", label: "Binary (Base 2)", chars: "0-1" },
  { value: "8", label: "Octal (Base 8)", chars: "0-7" },
  { value: "10", label: "Decimal (Base 10)", chars: "0-9" },
  { value: "16", label: "Hexadecimal (Base 16)", chars: "0-9, A-F" },
  { value: "32", label: "Base32", chars: "A-Z, 2-7" },
  { value: "36", label: "Base36", chars: "0-9, A-Z" },
  { value: "64", label: "Base64", chars: "A-Z, a-z, 0-9, +, /" },
];

export default function NumberBaseConverter() {
  const [fromBase, setFromBase] = useState<BaseType>("10");
  const [toBase, setToBase] = useState<BaseType>("16");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  const decimalToBase = (decimal: number, base: BaseType): string => {
    if (base === "64") {
      // Base64 encoding for numbers
      if (decimal === 0) return base64Alphabet[0];
      let result = "";
      let num = decimal;
      while (num > 0) {
        result = base64Alphabet[num % 64] + result;
        num = Math.floor(num / 64);
      }
      return result;
    } else if (base === "32") {
      // Base32 encoding for numbers
      if (decimal === 0) return base32Alphabet[0];
      let result = "";
      let num = decimal;
      while (num > 0) {
        result = base32Alphabet[num % 32] + result;
        num = Math.floor(num / 32);
      }
      return result;
    } else {
      // Standard bases 2-36
      return decimal.toString(parseInt(base));
    }
  };

  const baseToDecimal = (value: string, base: BaseType): number => {
    if (base === "64") {
      // Base64 decoding for numbers
      let result = 0;
      for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const digit = base64Alphabet.indexOf(char);
        if (digit === -1) throw new Error("Invalid Base64 character");
        result = result * 64 + digit;
      }
      return result;
    } else if (base === "32") {
      // Base32 decoding for numbers
      let result = 0;
      for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const digit = base32Alphabet.indexOf(char);
        if (digit === -1) throw new Error("Invalid Base32 character");
        result = result * 32 + digit;
      }
      return result;
    } else {
      // Standard bases 2-36
      const parsed = parseInt(value, parseInt(base));
      if (isNaN(parsed)) throw new Error("Invalid number");
      return parsed;
    }
  };

  const validateInput = (value: string, base: BaseType): boolean => {
    if (!value.trim()) return true;

    switch (base) {
      case "2":
        return /^[01]+$/.test(value);
      case "8":
        return /^[0-7]+$/.test(value);
      case "10":
        return /^\d+$/.test(value);
      case "16":
        return /^[0-9A-Fa-f]+$/.test(value);
      case "32":
        return /^[A-Z2-7]+$/i.test(value);
      case "36":
        return /^[0-9A-Za-z]+$/.test(value);
      case "64":
        return /^[A-Za-z0-9+/]+$/.test(value);
      default:
        return false;
    }
  };

  const convert = (value: string) => {
    setInput(value);

    if (!value.trim()) {
      setOutput("");
      setError("");
      return;
    }

    if (!validateInput(value, fromBase)) {
      const baseInfo = BASE_OPTIONS.find(b => b.value === fromBase);
      setError(`Invalid ${baseInfo?.label} number (use only ${baseInfo?.chars})`);
      setOutput("");
      return;
    }

    try {
      const decimal = baseToDecimal(value.toUpperCase(), fromBase);
      const converted = decimalToBase(decimal, toBase);
      setOutput(converted);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion error");
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);
    setInput(output);
    convert(output);
  };

  const getBaseInfo = (base: BaseType) => {
    return BASE_OPTIONS.find(b => b.value === base);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Number Base Converter</h1>
        <p className="text-muted-foreground">
          Convert numbers between different bases (Binary, Octal, Decimal, Hex, Base32, Base36, Base64)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base Conversion</CardTitle>
          <CardDescription>Select source and target base, then enter your number</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr]">
            <div className="space-y-2">
              <Label htmlFor="from-base">From Base</Label>
              <Select value={fromBase} onValueChange={(value) => {
                setFromBase(value as BaseType);
                convert(input);
              }}>
                <SelectTrigger id="from-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BASE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Uses: {getBaseInfo(fromBase)?.chars}
              </p>
            </div>

            <div className="flex items-center justify-center pt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={swap}
                className="hover:bg-primary/10"
                title="Swap bases"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-base">To Base</Label>
              <Select value={toBase} onValueChange={(value) => {
                setToBase(value as BaseType);
                convert(input);
              }}>
                <SelectTrigger id="to-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BASE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Uses: {getBaseInfo(toBase)?.chars}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Input Number</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => convert(e.target.value)}
              placeholder={`Enter ${getBaseInfo(fromBase)?.label.toLowerCase()} number`}
              className="font-mono text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="output">Output Number</Label>
            <div className="flex gap-2">
              <Input
                id="output"
                value={output}
                readOnly
                placeholder="Converted number will appear here"
                className="font-mono text-lg flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
                disabled={!output}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {output && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">From:</span>
                  <span className="ml-2 font-semibold">{getBaseInfo(fromBase)?.label}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">To:</span>
                  <span className="ml-2 font-semibold">{getBaseInfo(toBase)?.label}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Decimal equivalent:</span>
                  <span className="ml-2 font-mono">
                    {input && !error ? baseToDecimal(input.toUpperCase(), fromBase).toString() : "-"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-3">Common Examples:</h3>
            <div className="grid gap-2 text-xs">
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-muted rounded">255</code>
                <span className="text-muted-foreground">decimal =</span>
                <code className="px-2 py-1 bg-muted rounded">FF</code>
                <span className="text-muted-foreground">hex =</span>
                <code className="px-2 py-1 bg-muted rounded">11111111</code>
                <span className="text-muted-foreground">binary</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-muted rounded">1000</code>
                <span className="text-muted-foreground">decimal =</span>
                <code className="px-2 py-1 bg-muted rounded">3E8</code>
                <span className="text-muted-foreground">hex =</span>
                <code className="px-2 py-1 bg-muted rounded">RS</code>
                <span className="text-muted-foreground">base32</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
