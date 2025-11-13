import { Check, Copy, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ImageToBase64() {
  const [base64, setBase64] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBase64(result);
      setImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Image to Base64</h1>
        <p className="text-muted-foreground">Convert images to Base64 encoded strings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select an image file to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Image File</Label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
              />
            </div>

            {imageUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-md p-4 bg-muted flex items-center justify-center min-h-[200px]">
                  <img src={imageUrl} alt="Preview" className="max-w-full max-h-[300px] object-contain" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Base64 Output</CardTitle>
            <CardDescription>Encoded Base64 string</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Base64 encoded image will appear here..."
              value={base64}
              readOnly
              className="font-mono flex-1 resize-none text-xs"
            />

            <Button onClick={copyToClipboard} disabled={!base64} variant="outline" className="w-full">
              {copied ? (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-4 h-4" />
                  Copy Base64
                </>
              )}
            </Button>

            {base64 && (
              <div className="text-xs text-muted-foreground text-center">
                Size: {(base64.length / 1024).toFixed(2)} KB
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
