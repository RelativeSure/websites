import { Check, Copy, FileText, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function DataUriPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUri, setDataUri] = useState("");
  const [copied, setCopied] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [textDataUri, setTextDataUri] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setDataUri(result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleTextToDataUri = () => {
    const encoded = btoa(unescape(encodeURIComponent(textInput)));
    const uri = `data:text/plain;base64,${encoded}`;
    setTextDataUri(uri);
  };

  const handleCopy = async (text: string, setState: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setState(true);
      setTimeout(() => setState(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getImagePreview = () => {
    if (!file || !file.type.startsWith("image/")) return null;
    return (
      <div className="mt-4">
        <Label>Preview</Label>
        <div className="mt-2 p-4 bg-muted rounded-md flex items-center justify-center">
          <img src={dataUri} alt="Preview" className="max-w-full max-h-[300px] object-contain" />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Data URI Generator</h1>
        <p className="text-muted-foreground">Convert files and text to Data URIs for embedding in HTML/CSS</p>
      </div>

      <Tabs defaultValue="file" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">File to Data URI</TabsTrigger>
          <TabsTrigger value="text">Text to Data URI</TabsTrigger>
        </TabsList>

        <TabsContent value="file">
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>Select a file to convert to a Data URI (images work best)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Choose File</Label>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => document.getElementById("file-upload")?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {file ? file.name : "Select File"}
                  </Button>
                  <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                </div>
                {file && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Type: {file.type || "unknown"}</div>
                    <div>Size: {formatSize(file.size)}</div>
                    <div>Data URI Size: {formatSize(dataUri.length)}</div>
                  </div>
                )}
              </div>

              {getImagePreview()}

              {dataUri && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Data URI</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(dataUri, setCopied)}>
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
                  <Textarea value={dataUri} readOnly className="font-mono text-xs min-h-[200px]" />
                </div>
              )}

              {dataUri && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
                  <h4 className="font-semibold text-sm mb-2">Usage Examples</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">HTML:</div>
                      <code className="text-xs block p-2 bg-muted rounded">
                        &lt;img src=&quot;{dataUri.substring(0, 50)}...&quot; /&gt;
                      </code>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs mb-1">CSS:</div>
                      <code className="text-xs block p-2 bg-muted rounded">
                        background-image: url(&apos;{dataUri.substring(0, 40)}...&apos;);
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text to Data URI</CardTitle>
              <CardDescription>Convert plain text to a Data URI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Text Content</Label>
                <Textarea
                  id="text-input"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text to convert..."
                  className="min-h-[150px]"
                />
              </div>

              <Button onClick={handleTextToDataUri} className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Data URI
              </Button>

              {textDataUri && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Generated Data URI</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const copied = document.createElement("button");
                        handleCopy(textDataUri, (val) => {
                          if (val) {
                            copied.textContent = "Copied!";
                          }
                        });
                      }}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Textarea value={textDataUri} readOnly className="font-mono text-xs min-h-[150px]" />
                  <div className="text-sm text-muted-foreground">Size: {formatSize(textDataUri.length)}</div>
                </div>
              )}

              {textDataUri && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
                  <h4 className="font-semibold text-sm mb-2">Usage Example</h4>
                  <div className="text-sm font-mono">
                    <div className="text-muted-foreground text-xs mb-1">HTML:</div>
                    <code className="text-xs block p-2 bg-muted rounded">
                      &lt;iframe src=&quot;{textDataUri.substring(0, 50)}...&quot;&gt;&lt;/iframe&gt;
                    </code>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>About Data URIs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Data URIs allow you to embed small files directly in your HTML or CSS, eliminating the need for separate
            HTTP requests.
          </p>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <strong className="text-yellow-800 dark:text-yellow-300">Note:</strong> Data URIs increase file size by ~33%
            due to Base64 encoding. Best for small files (&lt;10KB).
          </div>
          <div>
            <strong>Format:</strong> <code className="text-xs">data:[&lt;mediatype&gt;][;base64],&lt;data&gt;</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
