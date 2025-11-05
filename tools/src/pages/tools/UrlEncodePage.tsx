import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UrlEncodeTool() {
  const [plainText, setPlainText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setError("");
      const encoded = encodeURIComponent(plainText);
      setEncodedText(encoded);
    } catch (err) {
      setError(`Error encoding: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const decode = () => {
    try {
      setError("");
      const decoded = decodeURIComponent(encodedText);
      setPlainText(decoded);
    } catch (err) {
      setError(`Error decoding: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const clearAll = () => {
    setPlainText("");
    setEncodedText("");
    setError("");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">URL Encoder/Decoder</h1>
        <p className="text-muted-foreground">
          Encode or decode URL parameters and query strings
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Plain Text</CardTitle>
            <CardDescription>Enter text to encode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Hello World!"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              className="font-mono flex-1 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                <ArrowDown className="mr-2 w-4 h-4" />
                Encode URL
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>URL Encoded</CardTitle>
            <CardDescription>Enter URL encoded text to decode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Hello%20World%21"
              value={encodedText}
              onChange={(e) => setEncodedText(e.target.value)}
              className="font-mono flex-1 resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={decode} className="flex-1">
                <ArrowUp className="mr-2 w-4 h-4" />
                Decode URL
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
