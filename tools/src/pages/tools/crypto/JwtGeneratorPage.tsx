import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Algorithm = "HS256" | "HS384" | "HS512";

export default function JwtGeneratorPage() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("HS256");
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [header, setHeader] = useState(JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2));
  const [payload, setPayload] = useState(
    JSON.stringify(
      {
        sub: "1234567890",
        name: "John Doe",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
      null,
      2
    )
  );
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const base64UrlEncode = (str: string): string => {
    const base64 = btoa(str);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const getHashAlgorithm = (alg: Algorithm): string => {
    const map: Record<Algorithm, string> = {
      HS256: "SHA-256",
      HS384: "SHA-384",
      HS512: "SHA-512",
    };
    return map[alg];
  };

  const generateToken = async () => {
    try {
      setError("");

      // Parse and validate JSON
      let headerObj;
      let payloadObj;

      try {
        headerObj = JSON.parse(header);
      } catch (_err) {
        throw new Error("Invalid header JSON");
      }

      try {
        payloadObj = JSON.parse(payload);
      } catch (_err) {
        throw new Error("Invalid payload JSON");
      }

      if (!secret.trim()) {
        throw new Error("Secret key is required");
      }

      // Update algorithm in header
      headerObj.alg = algorithm;
      const headerStr = JSON.stringify(headerObj);
      const payloadStr = JSON.stringify(payloadObj);

      // Encode header and payload
      const encodedHeader = base64UrlEncode(headerStr);
      const encodedPayload = base64UrlEncode(payloadStr);

      // Create signature
      const data = `${encodedHeader}.${encodedPayload}`;
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const messageData = encoder.encode(data);

      // Import secret as crypto key
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: getHashAlgorithm(algorithm) },
        false,
        ["sign"]
      );

      // Sign the data
      const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);

      // Encode signature
      const encodedSignature = arrayBufferToBase64Url(signature);

      // Create final token
      const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
      setToken(jwt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate JWT");
      setToken("");
    }
  };

  const handleAlgorithmChange = (value: Algorithm) => {
    setAlgorithm(value);
    try {
      const headerObj = JSON.parse(header);
      headerObj.alg = value;
      setHeader(JSON.stringify(headerObj, null, 2));
    } catch (_err) {
      // Ignore JSON parse errors
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const setDefaultPayload = () => {
    const now = Math.floor(Date.now() / 1000);
    setPayload(
      JSON.stringify(
        {
          sub: "1234567890",
          name: "John Doe",
          iat: now,
          exp: now + 3600,
        },
        null,
        2
      )
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JWT Generator</h1>
        <p className="text-muted-foreground">Generate JSON Web Tokens with custom claims and signatures</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm & Secret</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="algorithm">Algorithm</Label>
                <Select value={algorithm} onValueChange={(value) => handleAlgorithmChange(value as Algorithm)}>
                  <SelectTrigger id="algorithm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HS256">HS256 (HMAC SHA-256)</SelectItem>
                    <SelectItem value="HS384">HS384 (HMAC SHA-384)</SelectItem>
                    <SelectItem value="HS512">HS512 (HMAC SHA-512)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secret">Secret Key</Label>
                <Input
                  id="secret"
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter secret key..."
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Header</CardTitle>
              <CardDescription>JWT header (JSON)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeholder="JWT header JSON..."
                className="font-mono min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payload</CardTitle>
                  <CardDescription>JWT payload claims (JSON)</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={setDefaultPayload}>
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder="JWT payload JSON..."
                className="font-mono min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Button onClick={generateToken} className="w-full">
            Generate JWT
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Token</CardTitle>
                {token && (
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
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
            </CardHeader>
            <CardContent>
              {token ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono text-xs break-all">{token}</p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Header</Label>
                      <div className="p-2 bg-primary/10 rounded-md mt-1">
                        <p className="font-mono text-xs break-all text-primary">{token.split(".")[0]}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Payload</Label>
                      <div className="p-2 bg-secondary/10 rounded-md mt-1">
                        <p className="font-mono text-xs break-all text-secondary-foreground">{token.split(".")[1]}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Signature</Label>
                      <div className="p-2 bg-muted rounded-md mt-1">
                        <p className="font-mono text-xs break-all">{token.split(".")[2]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Generated token will appear here</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Claims</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div>
                <strong>iss</strong> (issuer): Token issuer
              </div>
              <div>
                <strong>sub</strong> (subject): Subject identifier
              </div>
              <div>
                <strong>aud</strong> (audience): Intended recipient
              </div>
              <div>
                <strong>exp</strong> (expiration): Expiration timestamp
              </div>
              <div>
                <strong>iat</strong> (issued at): Issued at timestamp
              </div>
              <div>
                <strong>nbf</strong> (not before): Not valid before timestamp
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
