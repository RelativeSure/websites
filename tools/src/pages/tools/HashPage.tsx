import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setHash("");
      return;
    }

    const generateHash = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashHex = Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        setHash(hashHex);
      } catch (err) {
        console.error("Error generating hash:", err);
      }
    };

    generateHash();
  }, [input, algorithm]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
        <p className="text-muted-foreground">
          Generate SHA-1, SHA-256, and SHA-512 hashes from your text
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Hash Algorithm</CardTitle>
          <CardDescription>Select the hashing algorithm to use</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="algorithm">Algorithm</Label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>Enter text to generate hash</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono min-h-[150px]"
          />
        </CardContent>
      </Card>

      {hash && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{algorithm} Hash</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input value={hash} readOnly className="font-mono text-sm" />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(hash)}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
