import bcrypt from "bcryptjs";
import { Check, Copy, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function BcryptPage() {
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState("10");
  const [hash, setHash] = useState("");
  const [comparePassword, setComparePassword] = useState("");
  const [compareHash, setCompareHash] = useState("");
  const [compareResult, setCompareResult] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateHash = async () => {
    if (!password) return;

    setGenerating(true);
    try {
      // Use setTimeout to avoid blocking UI
      setTimeout(async () => {
        const salt = await bcrypt.genSalt(parseInt(rounds, 10));
        const hashed = await bcrypt.hash(password, salt);
        setHash(hashed);
        setGenerating(false);
      }, 10);
    } catch (err) {
      console.error("Hash generation failed:", err);
      setGenerating(false);
    }
  };

  const comparePasswords = async () => {
    if (!comparePassword || !compareHash) return;

    try {
      const result = await bcrypt.compare(comparePassword, compareHash);
      setCompareResult(result);
    } catch (_err) {
      setCompareResult(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getRoundsInfo = (rounds: string) => {
    const r = parseInt(rounds, 10);
    if (r < 8) return "Weak - Not recommended";
    if (r <= 10) return "Standard - Good for most use cases";
    if (r <= 12) return "Strong - Slower but more secure";
    return "Very Strong - Significantly slower";
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Bcrypt Hash Generator</h1>
        <p className="text-muted-foreground">Generate and verify bcrypt password hashes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Generate Hash
            </CardTitle>
            <CardDescription>Create a bcrypt hash from a password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to hash"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rounds">Salt Rounds</Label>
              <Select value={rounds} onValueChange={setRounds}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8 rounds (Fast)</SelectItem>
                  <SelectItem value="10">10 rounds (Default)</SelectItem>
                  <SelectItem value="12">12 rounds (Strong)</SelectItem>
                  <SelectItem value="14">14 rounds (Very Strong)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{getRoundsInfo(rounds)}</p>
            </div>

            <Button onClick={generateHash} disabled={!password || generating} className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              {generating ? "Generating..." : "Generate Hash"}
            </Button>

            {hash && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Hash</Label>
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
                <Textarea value={hash} readOnly className="font-mono text-xs" rows={3} />
                <div className="text-xs text-muted-foreground">Length: {hash.length} characters</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verify Hash
            </CardTitle>
            <CardDescription>Compare a password against a hash</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="compare-password">Password to Verify</Label>
              <Input
                id="compare-password"
                type="password"
                value={comparePassword}
                onChange={(e) => setComparePassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compare-hash">Bcrypt Hash</Label>
              <Textarea
                id="compare-hash"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                placeholder="Enter bcrypt hash to compare"
                className="font-mono text-xs"
                rows={3}
              />
            </div>

            <Button onClick={comparePasswords} disabled={!comparePassword || !compareHash} className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              Verify Password
            </Button>

            {compareResult !== null && (
              <div
                className={`p-4 rounded-md border ${
                  compareResult
                    ? "bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800"
                }`}
              >
                <div
                  className={`font-semibold ${
                    compareResult ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {compareResult ? "✓ Password Matches" : "✗ Password Does Not Match"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {compareResult ? "The password is correct for this hash" : "The password does not match this hash"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Bcrypt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Bcrypt</strong> is a password hashing function designed to be computationally expensive, making it
            resistant to brute-force attacks.
          </p>
          <div>
            <strong>Salt Rounds:</strong> The number of rounds determines how slow the hashing is. More rounds = more
            secure but slower.
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>8 rounds: ~40ms (minimum recommended)</li>
              <li>10 rounds: ~150ms (default, recommended)</li>
              <li>12 rounds: ~600ms (high security)</li>
              <li>14 rounds: ~2.5s (very high security)</li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <strong className="text-blue-800 dark:text-blue-300">Security Note:</strong> All hashing is done locally in
            your browser. Your passwords never leave your device.
          </div>
          <p>
            <strong>Hash Format:</strong> Bcrypt hashes include the algorithm version, cost factor (rounds), salt, and
            hash all in one string.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
