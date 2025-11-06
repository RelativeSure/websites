import { useState, useRef } from "react";
import jsQR from "jsqr";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QrScannerPage() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setResult("");

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setImagePreview(imageData);
      scanImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const scanImage = (imageSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas not supported");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setResult(code.data);
        setError("");
      } else {
        setError("No QR code found in image");
        setResult("");
      }
    };
    img.src = imageSrc;
  };

  const startCamera = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
        scanFromCamera();
      }
    } catch (err) {
      setError("Camera access denied or not available");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const scanFromCamera = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !isScanning) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scan = () => {
      if (!isScanning) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResult(code.data);
          setError("");
          stopCamera();
          return;
        }
      }

      requestAnimationFrame(scan);
    };

    scan();
  };

  const handleClearImage = () => {
    setImagePreview("");
    setResult("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">QR Code Scanner</h1>
        <p className="text-muted-foreground">
          Scan QR codes from images or your camera
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {result && (
        <Card className="mb-6 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">QR Code Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-background rounded-md border">
              <p className="font-mono text-sm break-all">{result}</p>
            </div>
            {result.startsWith("http") && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.open(result, "_blank")}
              >
                Open Link
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="camera">Use Camera</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload QR Code Image</CardTitle>
              <CardDescription>
                Select an image file containing a QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Choose Image</Label>
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                  {imagePreview && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleClearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {imagePreview && (
                <div className="flex items-center justify-center p-4 bg-muted rounded-md">
                  <img
                    src={imagePreview}
                    alt="Uploaded QR Code"
                    className="max-w-full h-auto max-h-96"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera">
          <Card>
            <CardHeader>
              <CardTitle>Scan with Camera</CardTitle>
              <CardDescription>
                Use your device camera to scan QR codes in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isScanning ? (
                <Button onClick={startCamera} className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
              ) : (
                <>
                  <div className="relative bg-black rounded-md overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-auto"
                      playsInline
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="w-full"
                  >
                    Stop Camera
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Point your camera at a QR code to scan
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Upload Image:</strong> Select an image file containing a QR
            code from your device.
          </p>
          <p>
            <strong>Use Camera:</strong> Grant camera permission and point it
            at a QR code for instant scanning.
          </p>
          <p>All scanning is done locally in your browser - no data is sent to any server.</p>
        </CardContent>
      </Card>
    </div>
  );
}
