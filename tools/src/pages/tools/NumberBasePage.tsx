import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NumberBaseConverter() {
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hexadecimal, setHexadecimal] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const updateFromBinary = (value: string) => {
    setBinary(value);
    if (!value.trim()) {
      setOctal("");
      setDecimal("");
      setHexadecimal("");
      setError("");
      return;
    }

    if (!/^[01]+$/.test(value)) {
      setError("Invalid binary number (use only 0 and 1)");
      return;
    }

    const dec = parseInt(value, 2);
    setDecimal(dec.toString());
    setOctal(dec.toString(8));
    setHexadecimal(dec.toString(16).toUpperCase());
    setError("");
  };

  const updateFromOctal = (value: string) => {
    setOctal(value);
    if (!value.trim()) {
      setBinary("");
      setDecimal("");
      setHexadecimal("");
      setError("");
      return;
    }

    if (!/^[0-7]+$/.test(value)) {
      setError("Invalid octal number (use only 0-7)");
      return;
    }

    const dec = parseInt(value, 8);
    setDecimal(dec.toString());
    setBinary(dec.toString(2));
    setHexadecimal(dec.toString(16).toUpperCase());
    setError("");
  };

  const updateFromDecimal = (value: string) => {
    setDecimal(value);
    if (!value.trim()) {
      setBinary("");
      setOctal("");
      setHexadecimal("");
      setError("");
      return;
    }

    if (!/^\d+$/.test(value)) {
      setError("Invalid decimal number");
      return;
    }

    const dec = parseInt(value, 10);
    setBinary(dec.toString(2));
    setOctal(dec.toString(8));
    setHexadecimal(dec.toString(16).toUpperCase());
    setError("");
  };

  const updateFromHexadecimal = (value: string) => {
    setHexadecimal(value);
    if (!value.trim()) {
      setBinary("");
      setOctal("");
      setDecimal("");
      setError("");
      return;
    }

    if (!/^[0-9A-Fa-f]+$/.test(value)) {
      setError("Invalid hexadecimal number (use 0-9, A-F)");
      return;
    }

    const dec = parseInt(value, 16);
    setDecimal(dec.toString());
    setBinary(dec.toString(2));
    setOctal(dec.toString(8));
    setError("");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Number Base Converter</h1>
        <p className="text-muted-foreground">
          Convert between Binary, Octal, Decimal, and Hexadecimal
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Number Base Conversion</CardTitle>
          <CardDescription>Enter a number in any base to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="binary">Binary (Base 2)</Label>
            <div className="flex gap-2">
              <Input
                id="binary"
                value={binary}
                onChange={(e) => updateFromBinary(e.target.value)}
                placeholder="1010"
                className="font-mono flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(binary, "binary")}
                disabled={!binary}
              >
                {copied === "binary" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Uses digits: 0, 1</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="octal">Octal (Base 8)</Label>
            <div className="flex gap-2">
              <Input
                id="octal"
                value={octal}
                onChange={(e) => updateFromOctal(e.target.value)}
                placeholder="12"
                className="font-mono flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(octal, "octal")}
                disabled={!octal}
              >
                {copied === "octal" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Uses digits: 0-7</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="decimal">Decimal (Base 10)</Label>
            <div className="flex gap-2">
              <Input
                id="decimal"
                value={decimal}
                onChange={(e) => updateFromDecimal(e.target.value)}
                placeholder="10"
                className="font-mono flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(decimal, "decimal")}
                disabled={!decimal}
              >
                {copied === "decimal" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Uses digits: 0-9</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hexadecimal">Hexadecimal (Base 16)</Label>
            <div className="flex gap-2">
              <Input
                id="hexadecimal"
                value={hexadecimal}
                onChange={(e) => updateFromHexadecimal(e.target.value.toUpperCase())}
                placeholder="A"
                className="font-mono flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(hexadecimal, "hexadecimal")}
                disabled={!hexadecimal}
              >
                {copied === "hexadecimal" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Uses digits: 0-9, A-F</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
