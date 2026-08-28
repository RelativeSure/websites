import { ArrowDown, ArrowUp, Download, RotateCcw, RotateCw, Save, Trash2, Undo2, Upload } from "lucide-react";
import { degrees, PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PageState {
  originalIndex: number;
  rotation: number;
  removed: boolean;
}

export default function OrganizePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageState[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
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
      const loadedPages = pdf.getPages().map((page, index) => ({
        originalIndex: index,
        rotation: page.getRotation().angle,
        removed: false,
      }));

      setFile(selected);
      setPages(loadedPages);
    } catch {
      if (selectionRef.current !== token) return;
      setFile(null);
      setPages([]);
      setError("Could not read this PDF. It may be corrupted or password-protected.");
    }
  };

  const rotatePage = (originalIndex: number, delta: number) => {
    setPages((prev) =>
      prev.map((p) => (p.originalIndex === originalIndex ? { ...p, rotation: (p.rotation + delta + 360) % 360 } : p))
    );
  };

  const toggleRemoved = (originalIndex: number) => {
    setPages((prev) => prev.map((p) => (p.originalIndex === originalIndex ? { ...p, removed: !p.removed } : p)));
  };

  const movePage = (index: number, direction: -1 | 1) => {
    setPages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    if (!file) return;

    const kept = pages.filter((p) => !p.removed);
    if (kept.length === 0) {
      setError("At least one page must remain");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const bytes = await file.arrayBuffer();
      const source = await PDFDocument.load(bytes);
      const output = await PDFDocument.create();
      const copied = await output.copyPages(
        source,
        kept.map((p) => p.originalIndex)
      );

      copied.forEach((page, i) => {
        page.setRotation(degrees(kept[i].rotation));
        output.addPage(page);
      });

      const outputBytes = await output.save();
      const blob = new Blob([outputBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-organized.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save PDF");
    } finally {
      setSaving(false);
    }
  };

  const remainingCount = pages.filter((p) => !p.removed).length;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Organize PDF</h1>
        <p className="text-muted-foreground">Reorder, rotate, or remove pages from a PDF</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>Select a PDF to rotate or delete pages from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => document.getElementById("pdf-organize-upload")?.click()}
              className="w-full"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select PDF File
            </Button>
            <input
              id="pdf-organize-upload"
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

            {file && pages.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <div className="font-semibold mb-1">{file.name}</div>
                <div className="text-sm text-muted-foreground">
                  {pages.length} pages &middot; {remainingCount} remaining
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {file && pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>Reorder, rotate, or remove individual pages, then save</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {pages.map((p, index) => (
                <div
                  key={p.originalIndex}
                  className={`p-3 rounded-md border flex flex-col items-center gap-2 ${
                    p.removed ? "opacity-40 bg-muted/50" : "bg-muted"
                  }`}
                >
                  <div
                    className="w-12 h-16 border-2 border-primary/40 rounded-sm flex items-center justify-center text-xs font-mono transition-transform"
                    style={{ transform: `rotate(${p.rotation}deg)` }}
                  >
                    {p.originalIndex + 1}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={index === 0}
                      onClick={() => movePage(index, -1)}
                      aria-label="Move page earlier"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={index === pages.length - 1}
                      onClick={() => movePage(index, 1)}
                      aria-label="Move page later"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={p.removed}
                      onClick={() => rotatePage(p.originalIndex, -90)}
                      aria-label="Rotate left"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={p.removed}
                      onClick={() => rotatePage(p.originalIndex, 90)}
                      aria-label="Rotate right"
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => toggleRemoved(p.originalIndex)}
                      aria-label={p.removed ? "Restore page" : "Remove page"}
                    >
                      {p.removed ? <Undo2 className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleSave} className="w-full" size="lg" disabled={saving || remainingCount === 0}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save & Download"}
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
