import { AlertCircle, Check, Copy, Key, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function AesEncryptPage() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [password, setPassword] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    // Import password as key material
    const keyMaterial = await crypto.subtle.importKey("raw", passwordBuffer, { name: "PBKDF2" }, false, ["deriveKey"]);

    // Derive AES key using PBKDF2
    return await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as BufferSource,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  };

  const encrypt = async () => {
    setError("");
    setOutput("");

    if (!password || !plaintext) {
      setError("Please enter both password and plaintext");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(plaintext);

      // Generate random salt and IV
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Derive key from password
      const key = await deriveKey(password, salt);

      // Encrypt the data
      const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data);

      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encryptedData), salt.length + iv.length);

      // Convert to base64
      const base64 = btoa(String.fromCharCode(...combined));
      setOutput(base64);
    } catch (err) {
      setError("Encryption failed: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const decrypt = async () => {
    setError("");
    setOutput("");

    if (!password || !ciphertext) {
      setError("Please enter both password and ciphertext");
      return;
    }

    try {
      // Decode base64
      const combined = Uint8Array.from(atob(ciphertext), (c) => c.charCodeAt(0));

      // Extract salt, iv, and encrypted data
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encryptedData = combined.slice(28);

      // Derive key from password
      const key = await deriveKey(password, salt);

      // Decrypt the data
      const decryptedData = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encryptedData);

      // Convert decrypted data to string
      const decoder = new TextDecoder();
      const plaintext = decoder.decode(decryptedData);
      setOutput(plaintext);
    } catch (err) {
      setError("Decryption failed. Make sure the password is correct and the ciphertext is valid.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const length = 24;
    let password = "";
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) {
      password += chars[randomValues[i] % chars.length];
    }
    setPassword(password);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">AES Encryption/Decryption</h1>
        <p className="text-muted-foreground">Encrypt and decrypt text using AES-256-GCM encryption</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password
          </CardTitle>
          <CardDescription>Enter a strong password for encryption/decryption</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password..."
                className="flex-1"
              />
              <Button variant="outline" onClick={generatePassword}>
                Generate
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Use a strong, unique password. The same password must be used for encryption and decryption.
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={mode} onValueChange={(v) => setMode(v as "encrypt" | "decrypt")}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="encrypt">
            <Lock className="h-4 w-4 mr-2" />
            Encrypt
          </TabsTrigger>
          <TabsTrigger value="decrypt">
            <Unlock className="h-4 w-4 mr-2" />
            Decrypt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encrypt">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Plaintext</CardTitle>
              <CardDescription>Enter the text you want to encrypt</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter plaintext to encrypt..."
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Button onClick={encrypt} size="lg" className="w-full mb-6">
            <Lock className="h-4 w-4 mr-2" />
            Encrypt Text
          </Button>
        </TabsContent>

        <TabsContent value="decrypt">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ciphertext</CardTitle>
              <CardDescription>Enter the encrypted text (base64)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                placeholder="Enter ciphertext to decrypt..."
                className="font-mono text-sm min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Button onClick={decrypt} size="lg" className="w-full mb-6">
            <Unlock className="h-4 w-4 mr-2" />
            Decrypt Text
          </Button>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md mb-6">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{mode === "encrypt" ? "Encrypted Text" : "Decrypted Text"}</CardTitle>
                <CardDescription>
                  {mode === "encrypt" ? "Base64-encoded ciphertext" : "Original plaintext"}
                </CardDescription>
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
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className={`${mode === "encrypt" ? "font-mono text-xs" : ""} min-h-[200px] bg-muted`}
            />
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About AES Encryption</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>AES-256-GCM</strong> (Advanced Encryption Standard with Galois/Counter Mode) is a secure symmetric
            encryption algorithm that provides both confidentiality and authentication.
          </p>
          <div>
            <strong>How it works:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>Your password is converted to a 256-bit encryption key using PBKDF2</li>
              <li>Random salt ensures the same password produces different keys</li>
              <li>Random IV (Initialization Vector) ensures unique ciphertexts</li>
              <li>GCM mode provides authenticated encryption (tamper detection)</li>
            </ul>
          </div>
          <p>
            <strong>Security note:</strong> All encryption happens in your browser using the Web Crypto API. Your
            password and data never leave your device. However, this tool is for educational purposes - for production
            use, consult security experts.
          </p>
          <p>
            <strong>Password tips:</strong> Use a long, random password with mixed characters. The "Generate" button
            creates a cryptographically secure password.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
