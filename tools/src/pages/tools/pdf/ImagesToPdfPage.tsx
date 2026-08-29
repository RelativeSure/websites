import { ArrowDown, ArrowUp, Download, FileImage, Images, Trash2, Upload } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ImageFile {
  id: string;
  file: File;
}

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN = 36;

export default function ImagesToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState("");
  const [building, setBuilding] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const invalid = selected.some((file) => file.type !== "image/jpeg" && file.type !== "image/png");

    if (invalid) {
      setError("Please select JPG or PNG images only");
      return;
    }

    setError("");
    setImages((prev) => [
      ...prev,
      ...selected.map((file) => ({ id: `${file.name}-${file.size}-${crypto.randomUUID()}`, file })),
    ]);
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((f) => f.id !== id));
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleBuild = async () => {
    if (images.length === 0) return;

    setError("");
    setBuilding(true);

    try {
      const pdf = await PDFDocument.create();

      for (const { file } of images) {
        const bytes = await file.arrayBuffer();
        const image = file.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);

        const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        const maxWidth = PAGE_WIDTH - PAGE_MARGIN * 2;
        const maxHeight = PAGE_HEIGHT - PAGE_MARGIN * 2;
        const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;

        page.drawImage(image, {
          x: (PAGE_WIDTH - drawWidth) / 2,
          y: (PAGE_HEIGHT - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const outputBytes = await pdf.save();
      const blob = new Blob([outputBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "images.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to build PDF");
    } finally {
      setBuilding(false);
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
        <h1 className="text-3xl font-bold mb-2">Images to PDF</h1>
        <p className="text-muted-foreground">Combine JPG or PNG images into a single PDF, one image per page</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Select Images
          </CardTitle>
          <CardDescription>Choose one or more JPG/PNG images. Reorder them before building the PDF.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => document.getElementById("images-to-pdf-upload")?.click()}
              className="w-full"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Add Images
            </Button>
            <input
              id="images-to-pdf-upload"
              type="file"
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm font-mono text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {images.length > 0 && (
              <div className="space-y-2">
                {images.map((f, index) => (
                  <div key={f.id} className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <FileImage className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{f.file.name}</div>
                      <div className="text-xs text-muted-foreground">{formatSize(f.file.size)}</div>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={index === 0}
                      onClick={() => moveImage(index, -1)}
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={index === images.length - 1}
                      onClick={() => moveImage(index, 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => removeImage(f.id)} aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button onClick={handleBuild} className="w-full" size="lg" disabled={images.length === 0 || building}>
              <Images className="mr-2 h-4 w-4" />
              {building ? "Building..." : "Build PDF & Download"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {images.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Download className="h-10 w-10 mx-auto mb-3 opacity-50" />
            Add images above to get started. Everything happens locally in your browser.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
