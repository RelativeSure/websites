"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Base64Tool() {
  const [plainText, setPlainText] = useState("");
  const [base64Text, setBase64Text] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setError("");
      const encoded = btoa(plainText);
      setBase64Text(encoded);
    } catch (err) {
      setError(`Error encoding: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const decode = () => {
    try {
      setError("");
      const decoded = atob(base64Text);
      setPlainText(decoded);
    } catch (err) {
      setError(`Error decoding: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const clearAll = () => {
    setPlainText("");
    setBase64Text("");
    setError("");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Base64 Encoder/Decoder</h1>
        <p className="text-muted-foreground">Encode text to Base64 or decode Base64 to text</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plain Text</CardTitle>
            <CardDescription>Enter text to encode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter text here..."
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              className="font-mono min-h-[400px]"
            />
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                <ArrowDown className="mr-2 w-4 h-4" />
                Encode to Base64
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base64</CardTitle>
            <CardDescription>Enter Base64 to decode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter Base64 here..."
              value={base64Text}
              onChange={(e) => setBase64Text(e.target.value)}
              className="font-mono min-h-[400px]"
            />
            <div className="flex gap-2">
              <Button onClick={decode} className="flex-1">
                <ArrowUp className="mr-2 w-4 h-4" />
                Decode from Base64
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
