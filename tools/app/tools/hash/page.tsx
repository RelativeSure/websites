"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setHashes({});
      return;
    }

    const generateHashes = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      try {
        // Generate SHA-256
        const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
        const sha256 = Array.from(new Uint8Array(sha256Buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        // Generate SHA-512
        const sha512Buffer = await crypto.subtle.digest("SHA-512", data);
        const sha512 = Array.from(new Uint8Array(sha512Buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        // Generate SHA-1
        const sha1Buffer = await crypto.subtle.digest("SHA-1", data);
        const sha1 = Array.from(new Uint8Array(sha1Buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        setHashes({
          "SHA-256": sha256,
          "SHA-512": sha512,
          "SHA-1": sha1,
        });
      } catch (err) {
        console.error("Error generating hashes:", err);
      }
    };

    generateHashes();
  }, [input]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
        <p className="text-muted-foreground">Generate SHA-1, SHA-256, and SHA-512 hashes from your text</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>Enter text to generate hashes</CardDescription>
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

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          {Object.entries(hashes).map(([type, hash]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="text-lg">{type}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input value={hash} readOnly className="font-mono text-sm" />
                  <Button size="icon" variant="outline" onClick={() => copyToClipboard(hash, type)}>
                    {copied === type ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
