import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UuidVersion = "v1" | "v4" | "v7";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [version, setVersion] = useState<UuidVersion>("v7");
  const [copied, setCopied] = useState(false);

  // Generate UUID v1 (time-based)
  const generateUuidV1 = () => {
    const timestamp = Date.now();
    const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, "0");
    const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, "0");
    const timeHi = (((timestamp >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, "0");
    const clockSeq = Math.floor(Math.random() * 0x3fff) | 0x8000;
    const clockSeqStr = clockSeq.toString(16).padStart(4, "0");
    const node = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
    ).join("");
    return `${timeLow}-${timeMid}-${timeHi}-${clockSeqStr}-${node}`;
  };

  // Generate UUID v4 (random)
  const generateUuidV4 = () => {
    return crypto.randomUUID();
  };

  // Generate UUID v7 (time-ordered)
  const generateUuidV7 = () => {
    const timestamp = Date.now();
    const timestampHex = timestamp.toString(16).padStart(12, "0");
    const randomBytes = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
    ).join("");

    // Format: tttttttt-tttt-7xxx-yxxx-xxxxxxxxxxxx
    const formatted = `${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-7${randomBytes.slice(0, 3)}-${((parseInt(randomBytes.slice(3, 5), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0")}${randomBytes.slice(5, 7)}-${randomBytes.slice(7, 19)}`;
    return formatted;
  };

  const generateUuid = () => {
    let newUuid: string;
    switch (version) {
      case "v1":
        newUuid = generateUuidV1();
        break;
      case "v4":
        newUuid = generateUuidV4();
        break;
      case "v7":
        newUuid = generateUuidV7();
        break;
      default:
        newUuid = generateUuidV7();
    }
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
        <p className="text-muted-foreground">
          Generate UUIDs (Universally Unique Identifiers) - 128-bit numbers used to uniquely identify information. v1:
          time-based, v4: random, v7: time-ordered (recommended)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
          <CardDescription>Select version and generate UUID following RFC 4122 standard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="version">UUID Version</Label>
            <select
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value as UuidVersion)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="v1">v1 - Time-based</option>
              <option value="v4">v4 - Random</option>
              <option value="v7">v7 - Time-ordered (recommended)</option>
            </select>
          </div>

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
            Generate UUID {version}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
