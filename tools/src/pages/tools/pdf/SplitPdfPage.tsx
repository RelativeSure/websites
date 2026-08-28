import { Download, Scissors, Upload } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function parsePageRanges(input: string, pageCount: number): number[] {
  const indices = new Set<number>();

  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      for (let page = start; page <= end; page++) {
        if (page >= 1 && page <= pageCount) indices.add(page - 1);
      }
      continue;
    }

    const page = Number(trimmed);
    if (Number.isInteger(page) && page >= 1 && page <= pageCount) {
      indices.add(page - 1);
    } else {
      throw new Error(`Invalid page or range: "${trimmed}"`);
    }
  }

  if (indices.size === 0) {
    throw new Error("No valid pages selected");
  }

  return Array.from(indices).sort((a, b) => a - b);
}

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setError("");
    try {
      const bytes = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      setFile(selected);
      setPageCount(pdf.getPageCount());
      setRange(`1-${pdf.getPageCount()}`);
    } catch {
      setFile(null);
      setPageCount(0);
      setError("Could not read this PDF. It may be corrupted or password-protected.");
    }
  };

  const handleSplit = async () => {
    if (!file) return;

    setError("");
    setProcessing(true);

    try {
      const pageIndices = parsePageRanges(range, pageCount);
      const bytes = await file.arrayBuffer();
      const source = await PDFDocument.load(bytes);
      const output = await PDFDocument.create();
      const pages = await output.copyPages(source, pageIndices);
      for (const page of pages) {
        output.addPage(page);
      }

      const outputBytes = await output.save();
      const blob = new Blob([outputBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-split.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to split PDF");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Split PDF</h1>
        <p className="text-muted-foreground">Extract specific pages from a PDF into a new document</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>Select the PDF you want to extract pages from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => document.getElementById("pdf-split-upload")?.click()} className="w-full" size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Select PDF File
            </Button>
            <input
              id="pdf-split-upload"
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
            <CardTitle>Pages to Extract</CardTitle>
            <CardDescription>
              Enter page numbers or ranges, e.g. <span className="font-mono">1-3,5,8-10</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="range">Page Range</Label>
              <Input
                id="range"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder={`1-${pageCount}`}
                className="font-mono"
              />
            </div>

            <Button onClick={handleSplit} className="w-full" size="lg" disabled={processing || !range.trim()}>
              <Scissors className="mr-2 h-4 w-4" />
              {processing ? "Extracting..." : "Extract & Download"}
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
