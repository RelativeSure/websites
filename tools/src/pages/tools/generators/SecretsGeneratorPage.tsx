import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, Download, Plus, Trash2, KeyRound } from "lucide-react";

interface SecretItem {
  key: string;
  value: string;
  type: "random" | "uuid" | "hex" | "base64" | "custom";
  length?: number;
}

export default function SecretsGeneratorPage() {
  const [secrets, setSecrets] = useState<SecretItem[]>([
    { key: "API_KEY", value: "", type: "random", length: 32 },
    { key: "SECRET_TOKEN", value: "", type: "hex", length: 64 },
    { key: "DATABASE_URL", value: "", type: "custom" },
  ]);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRandomString = (length: number, chars: string): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    return result;
  };

  const generateSecret = (type: string, length: number = 32): string => {
    switch (type) {
      case "random":
        // Alphanumeric + special chars
        return generateRandomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*");

      case "hex":
        return generateRandomString(length, "0123456789abcdef");

      case "base64":
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return btoa(String.fromCharCode(...bytes)).slice(0, length);

      case "uuid":
        return crypto.randomUUID();

      default:
        return "";
    }
  };

  const generateAllSecrets = () => {
    const updated = secrets.map((secret) => {
      if (secret.type === "custom") {
        return secret; // Keep custom values
      }
      return {
        ...secret,
        value: generateSecret(secret.type, secret.length),
      };
    });
    setSecrets(updated);
    buildOutput(updated);
  };

  const buildOutput = (secretsList: SecretItem[]) => {
    const lines = secretsList.map((secret) => {
      if (!secret.key) return "";
      const value = secret.value || (secret.type !== "custom" ? "[GENERATE]" : "");
      return `${secret.key}=${value}`;
    });
    setOutput(lines.filter(Boolean).join("\n"));
  };

  const addSecret = () => {
    setSecrets([
      ...secrets,
      { key: `NEW_SECRET_${secrets.length + 1}`, value: "", type: "random", length: 32 },
    ]);
  };

  const removeSecret = (index: number) => {
    const updated = secrets.filter((_, i) => i !== index);
    setSecrets(updated);
    buildOutput(updated);
  };

  const updateSecret = (index: number, field: keyof SecretItem, value: any) => {
    const updated = [...secrets];
    updated[index] = { ...updated[index], [field]: value };
    setSecrets(updated);
    buildOutput(updated);
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

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Secrets Generator</h1>
        <p className="text-muted-foreground">
          Generate secure environment variables and secret files
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Secret Variables
              </CardTitle>
              <CardDescription>
                Configure your environment variables and secrets
              </CardDescription>
            </div>
            <Button onClick={addSecret} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Secret
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {secrets.map((secret, index) => (
              <div key={index} className="flex gap-3 items-start p-4 border rounded-md bg-muted/30">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label>Variable Name</Label>
                    <Input
                      value={secret.key}
                      onChange={(e) => updateSecret(index, "key", e.target.value)}
                      placeholder="SECRET_KEY"
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={secret.type}
                      onValueChange={(value) => updateSecret(index, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="random">Random (Alphanumeric)</SelectItem>
                        <SelectItem value="hex">Hex</SelectItem>
                        <SelectItem value="base64">Base64</SelectItem>
                        <SelectItem value="uuid">UUID</SelectItem>
                        <SelectItem value="custom">Custom Value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {secret.type !== "uuid" && secret.type !== "custom" && (
                    <div className="space-y-2">
                      <Label>Length</Label>
                      <Input
                        type="number"
                        value={secret.length || 32}
                        onChange={(e) =>
                          updateSecret(index, "length", parseInt(e.target.value))
                        }
                        min={8}
                        max={128}
                      />
                    </div>
                  )}

                  {secret.type === "custom" && (
                    <div className="space-y-2">
                      <Label>Custom Value</Label>
                      <Input
                        value={secret.value}
                        onChange={(e) => updateSecret(index, "value", e.target.value)}
                        placeholder="Enter custom value"
                        className="font-mono"
                      />
                    </div>
                  )}

                  {secret.type !== "custom" && (
                    <div className="space-y-2">
                      <Label>Generated Value</Label>
                      <Input
                        value={secret.value || "[Not generated]"}
                        readOnly
                        className="font-mono text-xs"
                      />
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSecret(index)}
                  className="mt-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={generateAllSecrets} className="w-full mt-4" size="lg">
            <KeyRound className="mr-2 h-4 w-4" />
            Generate All Secrets
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Output File</CardTitle>
            <div className="flex gap-2">
              {output && (
                <>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
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
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-1" />
                    Download .env
                  </Button>
                </>
              )}
            </div>
          </div>
          <CardDescription>
            Ready-to-use environment file format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={output}
            readOnly
            placeholder="Configure secrets above and click Generate..."
            className="min-h-[300px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Security Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md">
            <strong className="text-red-800 dark:text-red-300">Important:</strong>{" "}
            All secrets are generated locally in your browser using cryptographically secure random functions. Never commit .env files to version control!
          </div>
          <p>
            • Use strong random secrets for production applications
          </p>
          <p>
            • Store secrets in environment variables, not in code
          </p>
          <p>
            • Rotate secrets regularly for better security
          </p>
          <p>
            • Use different secrets for different environments (dev/staging/prod)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
