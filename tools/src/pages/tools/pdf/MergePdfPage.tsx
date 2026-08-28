import { ArrowDown, ArrowUp, Combine, Download, FileText, Trash2, Upload } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PdfFile {
  id: string;
  file: File;
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [error, setError] = useState("");
  const [merging, setMerging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const invalid = selected.some(
      (file) => file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")
    );

    if (invalid) {
      setError("Please select PDF files only");
      return;
    }

    setError("");
    setFiles((prev) => [
      ...prev,
      ...selected.map((file) => ({ id: `${file.name}-${file.size}-${crypto.randomUUID()}`, file })),
    ]);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Select at least two PDF files to merge");
      return;
    }

    setError("");
    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        for (const page of pages) {
          mergedPdf.addPage(page);
        }
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs");
    } finally {
      setMerging(false);
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Merge PDF</h1>
        <p className="text-muted-foreground">Combine multiple PDF files into a single document, in your browser</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Select PDF Files
          </CardTitle>
          <CardDescription>Choose two or more PDFs to combine. Reorder them before merging.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => document.getElementById("pdf-merge-upload")?.click()} className="w-full" size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Add PDF Files
            </Button>
            <input
              id="pdf-merge-upload"
              type="file"
              accept="application/pdf,.pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm font-mono text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, index) => (
                  <div key={f.id} className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{f.file.name}</div>
                      <div className="text-xs text-muted-foreground">{formatSize(f.file.size)}</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={index === 0}
                      onClick={() => moveFile(index, -1)}
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={index === files.length - 1}
                      onClick={() => moveFile(index, 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => removeFile(f.id)} aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button onClick={handleMerge} className="w-full" size="lg" disabled={files.length < 2 || merging}>
              <Combine className="mr-2 h-4 w-4" />
              {merging ? "Merging..." : "Merge & Download"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {files.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Download className="h-10 w-10 mx-auto mb-3 opacity-50" />
            Add PDF files above to get started. Everything happens locally in your browser.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
