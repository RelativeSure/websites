"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  const generateUuid = () => {
    // Generate UUID v4
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">UUID Generator</h1>
        <p className="text-muted-foreground">Generate random UUIDs (Universally Unique Identifiers)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UUID v4</CardTitle>
          <CardDescription>Randomly generated UUID following RFC 4122 standard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {uuid && (
            <div className="space-y-2">
              <Label>Generated UUID</Label>
              <div className="flex gap-2">
                <Input value={uuid} readOnly className="font-mono" />
                <Button size="icon" variant="outline" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}
          <Button onClick={generateUuid} className="w-full">
            <RefreshCw className="mr-2 w-4 h-4" />
            Generate UUID
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About UUIDs</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer
            systems.
          </p>
          <p>
            UUID v4 uses random numbers and has a very low probability of collision, making it safe for most use cases.
          </p>
          <p className="font-mono text-xs bg-muted p-2 rounded">Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</p>
        </CardContent>
      </Card>
    </div>
  );
}
