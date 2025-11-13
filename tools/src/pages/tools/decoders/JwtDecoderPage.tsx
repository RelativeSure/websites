import { AlertCircle, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JwtDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"header" | "payload" | null>(null);

  const decodeJwt = (token: string) => {
    setJwt(token);

    if (!token.trim()) {
      setHeader("");
      setPayload("");
      setSignature("");
      setError("");
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. JWT must have 3 parts separated by dots.");
      }

      // Decode header
      const headerDecoded = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      setHeader(JSON.stringify(headerDecoded, null, 2));

      // Decode payload
      const payloadDecoded = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      setPayload(JSON.stringify(payloadDecoded, null, 2));

      // Signature (keep as is)
      setSignature(parts[2]);

      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JWT token");
      setHeader("");
      setPayload("");
      setSignature("");
    }
  };

  const copyToClipboard = (text: string, type: "header" | "payload") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JWT Decoder</h1>
        <p className="text-muted-foreground">Decode and inspect JSON Web Tokens (JWT)</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>JWT Token</CardTitle>
            <CardDescription>Paste your JWT token to decode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <div className="space-y-2 flex-1 flex flex-col">
              <Label htmlFor="jwt">Token</Label>
              <Textarea
                id="jwt"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={jwt}
                onChange={(e) => decodeJwt(e.target.value)}
                className="font-mono flex-1 resize-none min-h-[200px]"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {signature && (
              <div className="space-y-2">
                <Label htmlFor="signature">Signature</Label>
                <Input id="signature" value={signature} readOnly className="font-mono text-xs" />
                <p className="text-xs text-muted-foreground">
                  ⚠️ Signature verification not performed (client-side only)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Header
                {header && (
                  <Button size="icon" variant="ghost" onClick={() => copyToClipboard(header, "header")}>
                    {copied === "header" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={header}
                readOnly
                placeholder="Decoded header will appear here..."
                className="font-mono min-h-[150px] text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Payload
                {payload && (
                  <Button size="icon" variant="ghost" onClick={() => copyToClipboard(payload, "payload")}>
                    {copied === "payload" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={payload}
                readOnly
                placeholder="Decoded payload will appear here..."
                className="font-mono min-h-[200px] text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
