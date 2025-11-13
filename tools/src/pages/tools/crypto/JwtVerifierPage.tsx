import { CheckCircle, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JwtVerifierPage() {
  const [jwt, setJwt] = useState("");
  const [secret, setSecret] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const base64UrlDecode = (str: string): string => {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(base64 + padding);
    return decoded;
  };

  const base64UrlEncode = (arrayBuffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const verifyJWT = async () => {
    try {
      if (!jwt || !secret) {
        setError("Please enter both JWT token and secret");
        return;
      }

      const parts = jwt.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      const [encodedHeader, encodedPayload, signature] = parts;

      // Decode header and payload
      const decodedHeader = JSON.parse(base64UrlDecode(encodedHeader));
      const decodedPayload = JSON.parse(base64UrlDecode(encodedPayload));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));

      // Get algorithm
      const algorithm = decodedHeader.alg;
      if (!algorithm || !algorithm.startsWith("HS")) {
        throw new Error(`Algorithm ${algorithm} is not supported. Only HMAC (HS256, HS384, HS512) are supported.`);
      }

      // Map algorithm to hash function
      const hashAlgorithm =
        algorithm === "HS256"
          ? "SHA-256"
          : algorithm === "HS384"
            ? "SHA-384"
            : algorithm === "HS512"
              ? "SHA-512"
              : null;

      if (!hashAlgorithm) {
        throw new Error(`Unsupported algorithm: ${algorithm}`);
      }

      // Create signature
      const encoder = new TextEncoder();
      const message = `${encodedHeader}.${encodedPayload}`;
      const messageData = encoder.encode(message);
      const keyData = encoder.encode(secret);

      const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: hashAlgorithm }, false, [
        "sign",
      ]);

      const signatureData = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
      const calculatedSignature = base64UrlEncode(signatureData);

      // Compare signatures
      const valid = calculatedSignature === signature;
      setIsValid(valid);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setIsValid(false);
      setHeader("");
      setPayload("");
    }
  };

  const getExpirationStatus = () => {
    try {
      const payloadObj = JSON.parse(payload);
      if (payloadObj.exp) {
        const exp = payloadObj.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const expired = now > exp;

        return {
          expired,
          message: expired
            ? `Expired on ${new Date(exp).toLocaleString()}`
            : `Expires on ${new Date(exp).toLocaleString()}`,
        };
      }
    } catch (err) {
      // Ignore
    }
    return null;
  };

  const expirationStatus = payload ? getExpirationStatus() : null;

  const exampleJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JWT Verifier</h1>
        <p className="text-muted-foreground">Verify JWT signatures and decode token contents</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            JWT Token & Secret
          </CardTitle>
          <CardDescription>Enter your JWT token and secret key to verify</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jwt">JWT Token</Label>
            <Textarea
              id="jwt"
              value={jwt}
              onChange={(e) => setJwt(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="min-h-[120px] font-mono text-xs"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setJwt(exampleJWT);
                setSecret("your-256-bit-secret");
              }}
            >
              Load Example
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secret">Secret Key</Label>
            <Input
              id="secret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="your-secret-key"
              className="font-mono"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <Button onClick={verifyJWT} className="w-full" size="lg">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Verify JWT Signature
          </Button>
        </CardContent>
      </Card>

      {isValid !== null && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Verification Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`p-6 rounded-md border ${
                isValid
                  ? "bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {isValid ? (
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                )}
                <div>
                  <div
                    className={`text-xl font-bold ${
                      isValid ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {isValid ? "Signature Valid" : "Signature Invalid"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isValid
                      ? "The JWT signature has been verified successfully"
                      : "The signature does not match or is corrupted"}
                  </div>
                </div>
              </div>

              {expirationStatus && (
                <div className="mt-3 pt-3 border-t">
                  <Badge variant={expirationStatus.expired ? "destructive" : "default"} className="mb-1">
                    {expirationStatus.expired ? "EXPIRED" : "ACTIVE"}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{expirationStatus.message}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {header && payload && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Header</CardTitle>
              <CardDescription>JWT header claims</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={header} readOnly className="font-mono text-xs min-h-[200px] bg-muted" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payload</CardTitle>
              <CardDescription>JWT payload claims</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={payload} readOnly className="font-mono text-xs min-h-[200px] bg-muted" />
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About JWT Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>JWT (JSON Web Token)</strong> verification ensures that a token hasn't been tampered with and was
            created with the correct secret key.
          </p>
          <div>
            <strong>Supported Algorithms:</strong>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>HS256 (HMAC with SHA-256)</li>
              <li>HS384 (HMAC with SHA-384)</li>
              <li>HS512 (HMAC with SHA-512)</li>
            </ul>
          </div>
          <div>
            <strong>Common Claims:</strong>
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>sub: Subject (user ID)</li>
              <li>exp: Expiration time (Unix timestamp)</li>
              <li>iat: Issued at (Unix timestamp)</li>
              <li>iss: Issuer</li>
              <li>aud: Audience</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <strong className="text-blue-800 dark:text-blue-300">Security Note:</strong> All verification is done
            locally in your browser. Your tokens and secrets never leave your device.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
