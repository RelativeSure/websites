import { Download, Save, Upload } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Metadata {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
}

const emptyMetadata: Metadata = {
  title: "",
  author: "",
  subject: "",
  keywords: "",
  creator: "",
  producer: "",
};

export default function PdfMetadataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [metadata, setMetadata] = useState<Metadata>(emptyMetadata);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setError("");
    try {
      const bytes = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      setFile(selected);
      setPageCount(pdf.getPageCount());
      setMetadata({
        title: pdf.getTitle() ?? "",
        author: pdf.getAuthor() ?? "",
        subject: pdf.getSubject() ?? "",
        keywords: pdf.getKeywords() ?? "",
        creator: pdf.getCreator() ?? "",
        producer: pdf.getProducer() ?? "",
      });
    } catch {
      setFile(null);
      setPageCount(0);
      setMetadata(emptyMetadata);
      setError("Could not read this PDF. It may be corrupted or password-protected.");
    }
  };

  const updateField = (field: keyof Metadata, value: string) => {
    setMetadata((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!file) return;

    setError("");
    setSaving(true);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      pdf.setTitle(metadata.title);
      pdf.setAuthor(metadata.author);
      pdf.setSubject(metadata.subject);
      pdf.setKeywords(metadata.keywords ? metadata.keywords.split(",").map((k) => k.trim()) : []);
      pdf.setCreator(metadata.creator);
      pdf.setProducer(metadata.producer);
      pdf.setModificationDate(new Date());

      const outputBytes = await pdf.save();
      const blob = new Blob([outputBytes] as BlobPart[], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-updated.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update PDF metadata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">PDF Metadata Editor</h1>
        <p className="text-muted-foreground">View and edit a PDF's title, author, and other document properties</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
          <CardDescription>Select a PDF to inspect and edit its metadata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => document.getElementById("pdf-metadata-upload")?.click()}
              className="w-full"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select PDF File
            </Button>
            <input
              id="pdf-metadata-upload"
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

            {file && (
              <div className="p-4 bg-muted rounded-md">
                <div className="font-semibold mb-1">{file.name}</div>
                <div className="text-sm text-muted-foreground">{pageCount} pages</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Document Properties</CardTitle>
            <CardDescription>Edit the fields below and save to download the updated PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={metadata.title} onChange={(e) => updateField("title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" value={metadata.author} onChange={(e) => updateField("author", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={metadata.subject} onChange={(e) => updateField("subject", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                value={metadata.keywords}
                onChange={(e) => updateField("keywords", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creator">Creator</Label>
              <Input id="creator" value={metadata.creator} onChange={(e) => updateField("creator", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="producer">Producer</Label>
              <Input
                id="producer"
                value={metadata.producer}
                onChange={(e) => updateField("producer", e.target.value)}
              />
            </div>

            <Button onClick={handleSave} className="w-full" size="lg" disabled={saving}>
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
