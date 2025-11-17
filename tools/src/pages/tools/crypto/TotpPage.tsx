import { Check, Copy, RefreshCw, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function TotpPage() {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const base32Decode = (base32: string): Uint8Array => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let value = 0;

    // Remove spaces and convert to uppercase
    base32 = base32.replace(/\s/g, "").toUpperCase();

    for (let i = 0; i < base32.length; i++) {
      const idx = alphabet.indexOf(base32[i]);
      if (idx === -1) continue;
      value = (value << 5) | idx;
      bits += value.toString(2).padStart(5, "0").slice(-5);
    }

    const bytes = new Uint8Array(Math.floor(bits.length / 8));
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(bits.substr(i * 8, 8), 2);
    }

    return bytes;
  };

  const generateHOTP = async (secret: Uint8Array, counter: number): Promise<string> => {
    try {
      // Convert counter to 8-byte array (big-endian)
      const counterBytes = new Uint8Array(8);
      for (let i = 7; i >= 0; i--) {
        counterBytes[i] = counter & 0xff;
        counter = counter >> 8;
      }

      // Import the secret key
      const key = await crypto.subtle.importKey("raw", secret as BufferSource, { name: "HMAC", hash: "SHA-1" }, false, [
        "sign",
      ]);

      // Generate HMAC
      const signature = await crypto.subtle.sign("HMAC", key, counterBytes as BufferSource);
      const hmac = new Uint8Array(signature);

      // Dynamic truncation
      const offset = hmac[hmac.length - 1] & 0x0f;
      const code =
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff);

      // Generate 6-digit code
      const otp = (code % 1000000).toString().padStart(6, "0");
      return otp;
    } catch (_err) {
      throw new Error("Failed to generate TOTP");
    }
  };

  const generateTOTP = async (secretKey: string): Promise<string> => {
    const decoded = base32Decode(secretKey);
    const timeStep = 30; // 30 seconds
    const counter = Math.floor(Date.now() / 1000 / timeStep);
    return await generateHOTP(decoded, counter);
  };

  const handleGenerate = async () => {
    if (!secret.trim()) {
      setError("Please enter a secret key");
      return;
    }

    try {
      const generatedToken = await generateTOTP(secret);
      setToken(generatedToken);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid secret key");
      setToken("");
    }
  };

  const generateRandomSecret = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let secret = "";
    for (let i = 0; i < 32; i++) {
      secret += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    setSecret(secret);
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

  // Auto-refresh TOTP every second
  useEffect(() => {
    if (!secret) return;

    const interval = setInterval(async () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = 30 - (now % 30);
      setTimeRemaining(remaining);

      // Regenerate when time expires or on first load
      if (remaining === 30 || !token) {
        try {
          const newToken = await generateTOTP(secret);
          setToken(newToken);
          setError("");
        } catch (_err) {
          setError("Invalid secret key");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secret, generateTOTP, token]);

  const progressValue = (timeRemaining / 30) * 100;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">TOTP Generator</h1>
        <p className="text-muted-foreground">Generate Time-based One-Time Passwords (2FA codes)</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Secret Key</CardTitle>
          <CardDescription>Enter your Base32-encoded secret key (from authenticator app setup)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secret">Secret Key</Label>
            <div className="flex gap-2">
              <Input
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value.toUpperCase())}
                placeholder="JBSWY3DPEHPK3PXP"
                className="font-mono"
              />
              <Button onClick={generateRandomSecret} variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Typically 16-32 characters (A-Z, 2-7)</p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <Button onClick={handleGenerate} className="w-full">
            <Shield className="mr-2 h-4 w-4" />
            Generate TOTP Code
          </Button>
        </CardContent>
      </Card>

      {token && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Code</CardTitle>
                <CardDescription>Valid for {timeRemaining} seconds</CardDescription>
              </div>
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
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold font-mono tracking-wider text-primary">
                {token.slice(0, 3)} {token.slice(3)}
              </div>
            </div>
            <Progress value={progressValue} className="h-2" />
            <div className="text-center text-sm text-muted-foreground">Code refreshes in {timeRemaining} seconds</div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong>1. Get your secret key:</strong> When setting up 2FA on a website, you'll typically see a QR code
            and a text code. The text code is your secret key.
          </div>
          <div>
            <strong>2. Enter the secret:</strong> Paste or type your Base32 secret key into the field above.
          </div>
          <div>
            <strong>3. Generate codes:</strong> The 6-digit code will auto-refresh every 30 seconds, just like Google
            Authenticator or Authy.
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <strong className="text-blue-800 dark:text-blue-300">Example Secret:</strong>{" "}
            <code className="text-xs">JBSWY3DPEHPK3PXP</code> (try this to test)
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <strong className="text-yellow-800 dark:text-yellow-300">Security Note:</strong> Your secret key never
            leaves your browser. All calculations are done locally.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
