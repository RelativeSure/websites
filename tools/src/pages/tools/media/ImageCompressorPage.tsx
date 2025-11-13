import { Download, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function ImageCompressorPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setOriginalFile(file);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setOriginalPreview(dataUrl);
      compressImage(dataUrl, quality[0] / 100);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (dataUrl: string, qualityValue: number) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          setCompressedSize(blob.size);
          const url = URL.createObjectURL(blob);
          setCompressedPreview(url);
        },
        "image/jpeg",
        qualityValue
      );
    };
    img.src = dataUrl;
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value);
    if (originalPreview) {
      compressImage(originalPreview, value[0] / 100);
    }
  };

  const handleDownload = () => {
    if (!compressedPreview) return;

    const link = document.createElement("a");
    link.href = compressedPreview;
    link.download = `compressed-${originalFile?.name || "image.jpg"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
  };

  const compressionRatio = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : "0";

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
        <p className="text-muted-foreground">Compress images while maintaining quality</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>Select an image to compress (JPG, PNG, WebP)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => document.getElementById("file-upload")?.click()} className="w-full" size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Select Image
            </Button>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

            {originalFile && (
              <div className="p-4 bg-muted rounded-md">
                <div className="font-semibold mb-2">Selected File:</div>
                <div className="text-sm space-y-1">
                  <div>Name: {originalFile.name}</div>
                  <div>Type: {originalFile.type}</div>
                  <div>Size: {formatSize(originalSize)}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {originalPreview && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quality Settings</CardTitle>
              <CardDescription>Adjust compression quality (lower = smaller file size)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Quality: {quality[0]}%</Label>
                  <div className="text-sm text-muted-foreground">Compression: {compressionRatio}%</div>
                </div>
                <Slider
                  value={quality}
                  onValueChange={handleQualityChange}
                  min={1}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{formatSize(originalSize)}</div>
                  <div className="text-sm text-muted-foreground">Original</div>
                </div>
                <div className="p-4 bg-primary/10 border-2 border-primary rounded-md">
                  <div className="text-2xl font-bold text-primary">{formatSize(compressedSize)}</div>
                  <div className="text-sm text-muted-foreground">Compressed</div>
                </div>
              </div>

              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Compressed Image
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden bg-muted flex items-center justify-center min-h-[300px]">
                  <img src={originalPreview} alt="Original" className="max-w-full max-h-[500px] object-contain" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compressed Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden bg-muted flex items-center justify-center min-h-[300px]">
                  {compressedPreview ? (
                    <img src={compressedPreview} alt="Compressed" className="max-w-full max-h-[500px] object-contain" />
                  ) : (
                    <div className="text-center text-muted-foreground p-8">Compressing...</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!originalPreview && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Select an image to get started</p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Image Compression</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Compression is done entirely in your browser - images never leave your device</p>
          <p>• JPEG format is used for compression with adjustable quality</p>
          <p>• Lower quality = smaller file size but visible artifacts may appear</p>
          <p>• Recommended: 70-85% quality for good balance of size and quality</p>
          <p>• Original image dimensions are preserved</p>
        </CardContent>
      </Card>
    </div>
  );
}
