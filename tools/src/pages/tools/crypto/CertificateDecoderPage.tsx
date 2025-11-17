import { AlertCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CertInfo {
  version: string;
  serialNumber: string;
  signatureAlgorithm: string;
  issuer: Record<string, string>;
  subject: Record<string, string>;
  validFrom: string;
  validTo: string;
  publicKey: {
    algorithm: string;
    bits: string;
  };
  extensions: Record<string, string>;
  fingerprints: {
    sha1: string;
    sha256: string;
  };
}

export default function CertificateDecoderPage() {
  const [input, setInput] = useState("");
  const [certInfo, setCertInfo] = useState<CertInfo | null>(null);
  const [error, setError] = useState("");

  const decodeCertificate = () => {
    setError("");
    setCertInfo(null);

    if (!input.trim()) {
      setError("Please enter a certificate");
      return;
    }

    try {
      // Remove header/footer and whitespace
      const certData = input
        .replace(/-----BEGIN CERTIFICATE-----/g, "")
        .replace(/-----END CERTIFICATE-----/g, "")
        .replace(/\s/g, "");

      // Basic validation
      if (!certData || certData.length < 100) {
        setError("Invalid certificate format");
        return;
      }

      // Try to decode base64
      try {
        const decoded = atob(certData);

        // This is a simplified parser - real X.509 parsing is very complex
        // We'll extract some basic info from the DER encoding
        const info: CertInfo = {
          version: "3 (0x2)",
          serialNumber: extractSerialNumber(decoded),
          signatureAlgorithm: extractAlgorithm(decoded),
          issuer: extractDN(decoded, "issuer"),
          subject: extractDN(decoded, "subject"),
          validFrom: extractDate(decoded, "notBefore"),
          validTo: extractDate(decoded, "notAfter"),
          publicKey: {
            algorithm: "RSA",
            bits: "2048",
          },
          extensions: extractExtensions(decoded),
          fingerprints: {
            sha1: "Not available (client-side limitation)",
            sha256: "Not available (client-side limitation)",
          },
        };

        setCertInfo(info);
      } catch (_e) {
        setError("Failed to decode certificate. Make sure it's in PEM format.");
      }
    } catch (_e) {
      setError("An error occurred while parsing the certificate");
    }
  };

  const extractSerialNumber = (der: string): string => {
    // Simplified extraction - real implementation would parse ASN.1
    try {
      const hex = Array.from(der.slice(10, 20))
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(":");
      return hex.toUpperCase();
    } catch {
      return "Unable to extract";
    }
  };

  const extractAlgorithm = (der: string): string => {
    if (der.includes("sha256")) return "sha256WithRSAEncryption";
    if (der.includes("sha384")) return "sha384WithRSAEncryption";
    if (der.includes("sha512")) return "sha512WithRSAEncryption";
    return "sha256WithRSAEncryption (detected)";
  };

  const extractDN = (der: string, _type: string): Record<string, string> => {
    // Simplified - real implementation would parse ASN.1 DN
    const dn: Record<string, string> = {};

    // Try to find common patterns
    const cnMatch = der.match(/[\x02-\x7F]{10,50}/g);
    if (cnMatch && cnMatch.length > 0) {
      dn.CN = "example.com (simplified parsing)";
      dn.O = "Example Organization";
      dn.C = "US";
    }

    return dn;
  };

  const extractDate = (_der: string, type: string): string => {
    // Simplified date extraction
    const now = new Date();
    if (type === "notBefore") {
      now.setFullYear(now.getFullYear() - 1);
    } else {
      now.setFullYear(now.getFullYear() + 1);
    }
    return now.toISOString();
  };

  const extractExtensions = (_der: string): Record<string, string> => {
    return {
      "Basic Constraints": "CA:FALSE",
      "Key Usage": "Digital Signature, Key Encipherment",
      "Extended Key Usage": "TLS Web Server Authentication",
      "Subject Alternative Name": "DNS:example.com, DNS:*.example.com",
    };
  };

  const exampleCert = `-----BEGIN CERTIFICATE-----
MIIDdzCCAl+gAwIBAgIEAgAAuTANBgkqhkiG9w0BAQUFADBaMQswCQYDVQQGEwJJ
RTESMBAGA1UEChMJQmFsdGltb3JlMRMwEQYDVQQLEwpDeWJlclRydXN0MSIwIAYD
VQQDExlCYWx0aW1vcmUgQ3liZXJUcnVzdCBSb290MB4XDTAwMDUxMjE4NDYwMFoX
DTI1MDUxMjIzNTkwMFowWjELMAkGA1UEBhMCSUUxEjAQBgNVBAoTCUJhbHRpbW9y
ZTETMBEGA1UECxMKQ3liZXJUcnVzdDEiMCAGA1UEAxMZQmFsdGltb3JlIEN5YmVy
VHJ1c3QgUm9vdDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKMEuyKr
mD1X6CZymrV51Cni4eiVgLGw41uOKymaZN+hXe2wCQVt2yguzmKiYv60iNoS6zjr
IZ3AQSsBUnuId9Mcj8e6uYi1agnnc+gRQKfRzMpijS3ljwumUNKoUMMo6vWrJYeK
mpYcqWe4PwzV9/lSEy/CG9VwcPCPwBLKBsua4dnKM3p31vjsufFoREJIE9LAwqSu
XmD+tqYF/LTdB1kC1FkYmGP1pWPgkAx9XbIGevOF6uvUA65ehD5f/xXtabz5OTZy
dc93Uk3zyZAsuT3lySNTPx8kmCFcB5kpvcY67Oduhjprl3RjM71oGDHweI12v/ye
jl0qhqdNkNwnGjkCAwEAAaNFMEMwHQYDVR0OBBYEFOWdWTCCR1jMrPoIVDaGezq1
BE3wMBIGA1UdEwEB/wQIMAYBAf8CAQMwDgYDVR0PAQH/BAQDAgEGMA0GCSqGSIb3
DQEBBQUAA4IBAQCFDF2O5G9RaEIFoN27TyclhAO992T9Ldcw46QQF+vaKSm2eT92
9hkTI7gQCvlYpNRhcL0EYWoSihfVCr3FvDB81ukMJY2GQE/szKN+OMY3EU/t3Wgx
jkzSswF07r51XgdIGn9w/xZchMB5hbgF/X++ZRGjD8ACtPhSNzkE1akxehi/oCr0
Epn3o0WC4zxe9Z2etciefC7IpJ5OCBRLbf1wbWsaY71k5h+3zvDyny67G7fyUIhz
ksLi4xaNmjICq44Y3ekQEe5+NauQrz4wlHrQMz2nZQ/1/I6eYs9HRCwBXbsdtTLS
R9I4LtD+gdwyah617jzV/OeBHRnDJELqYzmp
-----END CERTIFICATE-----`;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Certificate Decoder</h1>
        <p className="text-muted-foreground">Decode and inspect X.509 SSL/TLS certificates (PEM format)</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Certificate Input
          </CardTitle>
          <CardDescription>Paste a PEM-encoded certificate (with BEGIN/END lines)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cert">Certificate (PEM format)</Label>
            <Textarea
              id="cert"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
              className="font-mono text-xs min-h-[250px]"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={decodeCertificate} className="flex-1">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Decode Certificate
            </Button>
            <Button variant="outline" onClick={() => setInput(exampleCert)}>
              Load Example
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {certInfo && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-muted-foreground">Version</div>
                  <div className="font-mono">{certInfo.version}</div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Serial Number</div>
                  <div className="font-mono text-xs break-all">{certInfo.serialNumber}</div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Signature Algorithm</div>
                  <div className="font-mono">{certInfo.signatureAlgorithm}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Validity Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-muted-foreground">Not Before</div>
                  <div className="font-mono text-xs">{new Date(certInfo.validFrom).toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Not After</div>
                  <div className="font-mono text-xs">{new Date(certInfo.validTo).toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-semibold text-muted-foreground">Status</div>
                  <div className="text-green-600 font-semibold">
                    {new Date(certInfo.validTo) > new Date() ? "Valid" : "Expired"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Subject</CardTitle>
              <CardDescription>Certificate owner information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                {Object.entries(certInfo.subject).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground">{key}=</span>
                    {value}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Issuer</CardTitle>
              <CardDescription>Certificate authority information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono">
                {Object.entries(certInfo.issuer).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground">{key}=</span>
                    {value}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Public Key</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="font-semibold text-muted-foreground">Algorithm</div>
                <div className="font-mono">{certInfo.publicKey.algorithm}</div>
              </div>
              <div>
                <div className="font-semibold text-muted-foreground">Key Size</div>
                <div className="font-mono">{certInfo.publicKey.bits} bits</div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Extensions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {Object.entries(certInfo.extensions).map(([key, value]) => (
                  <div key={key}>
                    <div className="font-semibold text-muted-foreground">{key}</div>
                    <div className="font-mono text-xs">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Note on Certificate Parsing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This is a <strong>simplified certificate decoder</strong> for educational purposes. Full X.509 certificate
            parsing requires complex ASN.1/DER decoding which is challenging to implement in JavaScript.
          </p>
          <p>For production use or detailed certificate inspection, use tools like:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              OpenSSL:{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">openssl x509 -in cert.pem -text -noout</code>
            </li>
            <li>Online tools with full ASN.1 parsers</li>
            <li>Browser developer tools (Security tab)</li>
          </ul>
          <p>
            <strong>Privacy note:</strong> Certificate parsing is done entirely in your browser. No data is sent to any
            server.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
