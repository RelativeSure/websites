import { Download, ListOrdered, Upload } from "lucide-react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Position = "bottom-center" | "bottom-right" | "top-right";

const MARGIN = 28;
const FONT_SIZE = 10;

export default function PageNumbersPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNumber, setStartNumber] = useState("1");
  const [format, setFormat] = useState("Page {n} of {total}");
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

  const handleApply = async () => {
    if (!file) return;

    const start = Number.parseInt(startNumber, 10);
    if (!Number.isInteger(start)) {
      setError("Starting number must be a whole number");
      return;
    }

    setError("");
    setProcessing(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const total = pages.length;

      pages.forEach((page, index) => {
        const label = format.replace(/\{n\}/g, String(start + index)).replace(/\{total\}/g, String(total));
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(label, FONT_SIZE);

        let x: number;
        let y: number;
        if (position === "bottom-center") {
          x = width / 2 - textWidth / 2;
          y = MARGIN;
        } else if (position === "bottom-right") {
          x = width - textWidth - MARGIN;
          y = MARGIN;
        } else {
          x = width - textWidth - MARGIN;
          y = height - MARGIN;
        }

        page.drawText(label, { x, y, size: FONT_SIZE, font });
      });

      const outputBytes = await pdf.save();
      const blob = new Blob([outputBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-numbered.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add page numbers");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Add Page Numbers</h1>
        <p className="text-muted-foreground">Stamp page numbers onto every page of a PDF</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>Select the PDF you want to number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => document.getElementById("pdf-page-numbers-upload")?.click()}
              className="w-full"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select PDF File
            </Button>
            <input
              id="pdf-page-numbers-upload"
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
            <CardTitle>Numbering Settings</CardTitle>
            <CardDescription>
              Use <span className="font-mono">{"{n}"}</span> for the page number and{" "}
              <span className="font-mono">{"{total}"}</span> for the total page count
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={(value) => setPosition(value as Position)}>
                  <SelectTrigger id="position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-center">Bottom Center</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-number">Starting Number</Label>
                <Input
                  id="start-number"
                  type="number"
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Input
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="Page {n} of {total}"
                className="font-mono"
              />
            </div>

            <Button onClick={handleApply} className="w-full" size="lg" disabled={processing || !format.trim()}>
              <ListOrdered className="mr-2 h-4 w-4" />
              {processing ? "Applying..." : "Add Numbers & Download"}
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
