import { Check, Copy, Download, ExternalLink, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SecurityTxtPage() {
  const [contact, setContact] = useState("");
  const [expires, setExpires] = useState("");
  const [encryption, setEncryption] = useState("");
  const [acknowledgments, setAcknowledgments] = useState("");
  const [preferredLanguages, setPreferredLanguages] = useState("en");
  const [canonical, setCanonical] = useState("");
  const [policy, setPolicy] = useState("");
  const [hiring, setHiring] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateSecurityTxt = () => {
    const lines: string[] = [];

    // Required fields
    if (contact) {
      contact.split("\n").forEach((c) => {
        if (c.trim()) lines.push(`Contact: ${c.trim()}`);
      });
    }

    if (expires) {
      const date = new Date(expires);
      lines.push(`Expires: ${date.toISOString()}`);
    }

    // Optional fields
    if (encryption) lines.push(`Encryption: ${encryption}`);
    if (acknowledgments) lines.push(`Acknowledgments: ${acknowledgments}`);
    if (preferredLanguages) lines.push(`Preferred-Languages: ${preferredLanguages}`);
    if (canonical) lines.push(`Canonical: ${canonical}`);
    if (policy) lines.push(`Policy: ${policy}`);
    if (hiring) lines.push(`Hiring: ${hiring}`);

    const result = lines.join("\n");
    setOutput(result);
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
    const link = document.createElement("a");
    link.href = url;
    link.download = "security.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const setExampleValues = () => {
    setContact("mailto:security@example.com\nhttps://example.com/security");
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    setExpires(futureDate.toISOString().split("T")[0]);
    setEncryption("https://example.com/pgp-key.txt");
    setAcknowledgments("https://example.com/hall-of-fame");
    setPreferredLanguages("en, es");
    setCanonical("https://example.com/.well-known/security.txt");
    setPolicy("https://example.com/security-policy");
    setHiring("https://example.com/jobs");
  };

  const getExpiresMin = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Security.txt Generator</h1>
        <p className="text-muted-foreground">Generate a security.txt file for responsible security disclosure</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Configuration
          </CardTitle>
          <CardDescription>Fill in your security contact and policy information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact">
              Contact <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="mailto:security@example.com&#10;https://example.com/security&#10;(One per line)"
              className="font-mono text-sm"
              rows={3}
            />
            <div className="text-xs text-muted-foreground">
              Required. Email (mailto:) or URL where security issues can be reported. Add multiple contacts on separate
              lines.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expires">
              Expires <span className="text-destructive">*</span>
            </Label>
            <Input
              id="expires"
              type="date"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              min={getExpiresMin()}
            />
            <div className="text-xs text-muted-foreground">
              Required. Date when this security.txt file expires (ISO 8601 format). Should be less than a year in the
              future.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="encryption">Encryption</Label>
            <Input
              id="encryption"
              type="url"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              placeholder="https://example.com/pgp-key.txt"
            />
            <div className="text-xs text-muted-foreground">
              Optional. URL to your PGP key for encrypted communication.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="acknowledgments">Acknowledgments</Label>
            <Input
              id="acknowledgments"
              type="url"
              value={acknowledgments}
              onChange={(e) => setAcknowledgments(e.target.value)}
              placeholder="https://example.com/hall-of-fame"
            />
            <div className="text-xs text-muted-foreground">
              Optional. URL to a page listing security researchers who reported issues.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="languages">Preferred Languages</Label>
              <Input
                id="languages"
                value={preferredLanguages}
                onChange={(e) => setPreferredLanguages(e.target.value)}
                placeholder="en, es, fr"
              />
              <div className="text-xs text-muted-foreground">Comma-separated language codes (ISO 639-1)</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="canonical">Canonical URL</Label>
              <Input
                id="canonical"
                type="url"
                value={canonical}
                onChange={(e) => setCanonical(e.target.value)}
                placeholder="https://example.com/.well-known/security.txt"
              />
              <div className="text-xs text-muted-foreground">Canonical location of this file</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="policy">Policy</Label>
            <Input
              id="policy"
              type="url"
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
              placeholder="https://example.com/security-policy"
            />
            <div className="text-xs text-muted-foreground">
              Optional. URL to your security policy or disclosure policy.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hiring">Hiring</Label>
            <Input
              id="hiring"
              type="url"
              value={hiring}
              onChange={(e) => setHiring(e.target.value)}
              placeholder="https://example.com/jobs"
            />
            <div className="text-xs text-muted-foreground">Optional. URL to your security jobs page.</div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateSecurityTxt} className="flex-1" size="lg">
              Generate security.txt
            </Button>
            <Button onClick={setExampleValues} variant="outline" size="lg">
              Load Example
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated security.txt</CardTitle>
                <CardDescription>Place this file at /.well-known/security.txt</CardDescription>
              </div>
              <div className="flex gap-2">
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
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly className="font-mono text-sm min-h-[200px] bg-muted" />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About security.txt</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>
            <strong>security.txt</strong> is a proposed standard (RFC 9116) that allows websites to define security
            policies and contact information for security researchers.
          </p>
          <div>
            <strong>Where to place the file:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  https://example.com/.well-known/security.txt
                </code>{" "}
                (Recommended)
              </li>
              <li>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">https://example.com/security.txt</code> (Also
                valid)
              </li>
            </ul>
          </div>
          <div>
            <strong>Additional steps:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                Set Content-Type to <code>text/plain</code>
              </li>
              <li>Consider signing the file with PGP for authenticity</li>
              <li>Keep the file updated before expiration date</li>
              <li>Make sure contact methods are actively monitored</li>
            </ul>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <ExternalLink className="h-4 w-4" />
            <a
              href="https://securitytxt.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Learn more at securitytxt.org
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
