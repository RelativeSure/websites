import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQrCode = () => {
    if (!text.trim()) {
      setQrCodeUrl("");
      return;
    }

    // Using QR Server API - a free QR code generation service
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrCodeUrl(url);
  };

  const downloadQrCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-muted-foreground">
          Generate QR codes from text or URLs
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Enter text or URL to encode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text/URL</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL..."
                className="font-mono min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size: {size}px</Label>
              <input
                id="size"
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>

            <Button onClick={generateQrCode} className="w-full">
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>Generated QR code preview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center min-h-[300px] bg-muted rounded-md">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="max-w-full h-auto"
                  style={{ width: size, height: size }}
                />
              ) : (
                <p className="text-muted-foreground">QR code will appear here</p>
              )}
            </div>

            {qrCodeUrl && (
              <Button onClick={downloadQrCode} variant="outline" className="w-full">
                <Download className="mr-2 w-4 h-4" />
                Download QR Code
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
