import { Check, Copy, Download, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Base64ImagePage() {
  const [base64Input, setBase64Input] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageInfo, setImageInfo] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [encodedOutput, setEncodedOutput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const decodeBase64 = () => {
    try {
      setError("");
      let base64Data = base64Input.trim();

      if (!base64Data) {
        setError("Please enter base64 data");
        return;
      }

      // Remove data URI scheme if present
      const dataUriMatch = base64Data.match(/^data:([^;]+);base64,(.+)$/);
      let mimeType = "image/png";

      if (dataUriMatch) {
        mimeType = dataUriMatch[1];
        base64Data = dataUriMatch[2];
      }

      // Create data URL
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      // Test if valid by creating an image
      const testImg = new Image();
      testImg.onload = () => {
        setImagePreview(dataUrl);
        setImageInfo({
          mimeType,
          width: testImg.width,
          height: testImg.height,
          size: Math.round((base64Data.length * 3) / 4),
        });
      };
      testImg.onerror = () => {
        setError("Invalid base64 image data");
        setImagePreview("");
        setImageInfo(null);
      };
      testImg.src = dataUrl;
    } catch (err) {
      setError("Failed to decode base64 data");
      setImagePreview("");
      setImageInfo(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setError("");
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      setEncodedOutput(result);

      const img = new Image();
      img.onload = () => {
        setImageInfo({
          mimeType: file.type,
          width: img.width,
          height: img.height,
          size: file.size,
          name: file.name,
        });
      };
      img.src = result;
    };

    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    if (!imagePreview) return;

    const link = document.createElement("a");
    link.href = imagePreview;
    link.download = `decoded-image.${imageInfo?.mimeType?.split("/")[1] || "png"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearDecoder = () => {
    setBase64Input("");
    setImagePreview("");
    setImageInfo(null);
    setError("");
  };

  const clearEncoder = () => {
    setEncodedOutput("");
    setImageInfo(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / k ** i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Base64 Image Viewer</h1>
        <p className="text-muted-foreground">Decode base64 to images or encode images to base64</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <Tabs defaultValue="decode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decode">Decode Base64</TabsTrigger>
          <TabsTrigger value="encode">Encode Image</TabsTrigger>
        </TabsList>

        <TabsContent value="decode">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Base64 Input</CardTitle>
                  <CardDescription>Paste base64 string or data URI</CardDescription>
                </div>
                {base64Input && (
                  <Button variant="ghost" size="sm" onClick={clearDecoder}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                placeholder="data:image/png;base64,iVBORw0KGgo... or just base64 string"
                className="font-mono min-h-[150px]"
              />
              <Button onClick={decodeBase64} className="w-full">
                Decode Image
              </Button>
            </CardContent>
          </Card>

          {imagePreview && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Image Preview</CardTitle>
                    <Button variant="outline" size="sm" onClick={downloadImage}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                    <img ref={imgRef} src={imagePreview} alt="Decoded" className="max-w-full h-auto max-h-96 rounded" />
                  </div>
                </CardContent>
              </Card>

              {imageInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Image Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MIME Type:</span>
                      <span className="font-mono">{imageInfo.mimeType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-mono">
                        {imageInfo.width} × {imageInfo.height}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-mono">{formatBytes(imageInfo.size)}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="encode">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image to encode as base64</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Select Image
                </Button>
                {encodedOutput && (
                  <Button variant="outline" size="icon" onClick={clearEncoder}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {encodedOutput && (
                <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                  <img src={encodedOutput} alt="Preview" className="max-w-full h-auto max-h-64 rounded" />
                </div>
              )}
            </CardContent>
          </Card>

          {encodedOutput && (
            <>
              {imageInfo && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Image Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {imageInfo.name && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Filename:</span>
                        <span className="font-mono truncate ml-2">{imageInfo.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">MIME Type:</span>
                      <span className="font-mono">{imageInfo.mimeType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-mono">
                        {imageInfo.width} × {imageInfo.height}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-mono">{formatBytes(imageInfo.size)}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Base64 Output</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(encodedOutput)}>
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea value={encodedOutput} readOnly className="font-mono min-h-[200px] text-xs" />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
