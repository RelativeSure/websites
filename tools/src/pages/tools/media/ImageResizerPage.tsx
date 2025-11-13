import { Download, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ImageResizerPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState("0.9");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = event.target?.result as string;
      setOriginalImage(event.target?.result as string);
      setResizedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (newWidth: string) => {
    setWidth(newWidth);
    if (maintainAspect && originalDimensions.width > 0 && newWidth) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      const calculatedHeight = Math.round(parseInt(newWidth) * aspectRatio);
      setHeight(calculatedHeight.toString());
    }
  };

  const handleHeightChange = (newHeight: string) => {
    setHeight(newHeight);
    if (maintainAspect && originalDimensions.height > 0 && newHeight) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const calculatedWidth = Math.round(parseInt(newHeight) * aspectRatio);
      setWidth(calculatedWidth.toString());
    }
  };

  const resizeImage = () => {
    if (!originalImage || !width || !height) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setResizedImage(url);
        },
        format,
        parseFloat(quality)
      );
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!resizedImage) return;

    const link = document.createElement("a");
    link.href = resizedImage;
    const extension = format.split("/")[1];
    link.download = `resized.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const presets = [
    { name: "HD (1920x1080)", width: 1920, height: 1080 },
    { name: "Full HD (1080x1920)", width: 1080, height: 1920 },
    { name: "4K (3840x2160)", width: 3840, height: 2160 },
    { name: "Square (1000x1000)", width: 1000, height: 1000 },
    { name: "Instagram Post (1080x1080)", width: 1080, height: 1080 },
    { name: "Instagram Story (1080x1920)", width: 1080, height: 1920 },
    { name: "Twitter Post (1200x675)", width: 1200, height: 675 },
    { name: "Facebook Cover (820x312)", width: 820, height: 312 },
    { name: "YouTube Thumbnail (1280x720)", width: 1280, height: 720 },
    { name: "Thumbnail (300x300)", width: 300, height: 300 },
  ];

  const applyPreset = (preset: { width: number; height: number }) => {
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setMaintainAspect(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Image Resizer</h1>
        <p className="text-muted-foreground">Resize images to custom dimensions or presets</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>Select an image to resize</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <label>
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </Button>
        </CardContent>
      </Card>

      {originalImage && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Original Image</CardTitle>
                <CardDescription>
                  {originalDimensions.width} x {originalDimensions.height} pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img src={originalImage} alt="Original" className="max-w-full h-auto border rounded" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resize Settings</CardTitle>
                <CardDescription>Configure new dimensions and format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aspect"
                    checked={maintainAspect}
                    onCheckedChange={(checked) => setMaintainAspect(checked as boolean)}
                  />
                  <Label htmlFor="aspect" className="cursor-pointer">
                    Maintain aspect ratio
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Output Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/jpeg">JPEG</SelectItem>
                      <SelectItem value="image/png">PNG</SelectItem>
                      <SelectItem value="image/webp">WebP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {format === "image/jpeg" && (
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality: {(parseFloat(quality) * 100).toFixed(0)}%</Label>
                    <Input
                      id="quality"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                    />
                  </div>
                )}

                <Button onClick={resizeImage} className="w-full">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Resize Image
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Presets</CardTitle>
              <CardDescription>Quick dimension presets for common use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {presets.map((preset, idx) => (
                  <Button key={idx} variant="outline" size="sm" onClick={() => applyPreset(preset)}>
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {resizedImage && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resized Image</CardTitle>
                    <CardDescription>
                      {width} x {height} pixels
                    </CardDescription>
                  </div>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <img src={resizedImage} alt="Resized" className="max-w-full h-auto border rounded" />
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Privacy & Performance</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            All image resizing is done locally in your browser using the HTML5 Canvas API. Your images are never
            uploaded to any server.
          </p>
          <p>
            <strong>Supported formats:</strong> JPEG, PNG, WebP, GIF, BMP, and more. Output formats: JPEG, PNG, WebP.
          </p>
          <p>
            <strong>Tips:</strong> JPEG is best for photos, PNG for graphics with transparency, and WebP for modern
            browsers with better compression.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
