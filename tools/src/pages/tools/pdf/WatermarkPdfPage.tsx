import { Download, Stamp, Upload } from "lucide-react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: Number.parseInt(match[1], 16) / 255,
    g: Number.parseInt(match[2], 16) / 255,
    b: Number.parseInt(match[3], 16) / 255,
  };
}

export default function WatermarkPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState([48]);
  const [opacity, setOpacity] = useState([30]);
  const [rotation, setRotation] = useState([45]);
  const [color, setColor] = useState("#ff0000");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const selectionRef = useRef(0);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const token = ++selectionRef.current;
    setError("");
    try {
      const bytes = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      if (selectionRef.current !== token) return;
      setFile(selected);
      setPageCount(pdf.getPageCount());
    } catch {
      if (selectionRef.current !== token) return;
      setFile(null);
      setPageCount(0);
      setError("Could not read this PDF. It may be corrupted or password-protected.");
    }
  };

  const handleWatermark = async () => {
    if (!file || !text.trim()) return;

    setError("");
    setProcessing(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb(color);
      const size = fontSize[0];
      const textWidth = font.widthOfTextAtSize(text, size);

      for (const page of pdf.getPages()) {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size,
          font,
          color: rgb(r, g, b),
          opacity: opacity[0] / 100,
          rotate: degrees(rotation[0]),
        });
      }

      const outputBytes = await pdf.save();
      const blob = new Blob([outputBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-watermarked.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add watermark");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Watermark PDF</h1>
        <p className="text-muted-foreground">Stamp text diagonally across every page of a PDF</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>Select the PDF you want to watermark</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => document.getElementById("pdf-watermark-upload")?.click()}
              className="w-full"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select PDF File
            </Button>
            <input
              id="pdf-watermark-upload"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm font-mono text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {file && pageCount > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <div className="font-semibold mb-1">{file.name}</div>
                <div className="text-sm text-muted-foreground">{pageCount} pages</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {file && pageCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Watermark Settings</CardTitle>
            <CardDescription>Configure the text, appearance, and angle of the watermark</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="watermark-text">Watermark Text</Label>
              <Input id="watermark-text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="watermark-color">Color</Label>
                <Input
                  id="watermark-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-full p-1"
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider value={fontSize} onValueChange={setFontSize} min={8} max={120} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Opacity: {opacity[0]}%</Label>
                <Slider value={opacity} onValueChange={setOpacity} min={5} max={100} step={5} />
              </div>

              <div className="space-y-2">
                <Label>Rotation: {rotation[0]}&deg;</Label>
                <Slider value={rotation} onValueChange={setRotation} min={-90} max={90} step={5} />
              </div>
            </div>

            <Button onClick={handleWatermark} className="w-full" size="lg" disabled={processing || !text.trim()}>
              <Stamp className="mr-2 h-4 w-4" />
              {processing ? "Applying..." : "Watermark & Download"}
            </Button>
          </CardContent>
        </Card>
      )}

      {!file && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Download className="h-10 w-10 mx-auto mb-3 opacity-50" />
            Upload a PDF above to get started. Everything happens locally in your browser.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
