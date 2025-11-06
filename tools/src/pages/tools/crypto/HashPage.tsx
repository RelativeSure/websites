import { useState, useEffect } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setHash("");
      return;
    }

    const generateHash = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      try {
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashHex = Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        setHash(hashHex);
      } catch (err) {
        console.error("Error generating hash:", err);
      }
    };

    generateHash();
  }, [input, algorithm]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
        <p className="text-muted-foreground">
          Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from your text
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Hash</CardTitle>
          <CardDescription>Select algorithm and enter text to generate hash</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="algorithm">Algorithm</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {algorithm}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuRadioGroup value={algorithm} onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}>
                  <DropdownMenuRadioItem value="SHA-1">SHA-1</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="SHA-256">SHA-256</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="SHA-384">SHA-384</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="SHA-512">SHA-512</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              placeholder="Enter text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono min-h-[150px]"
            />
          </div>

          {hash && (
            <div className="space-y-2">
              <Label htmlFor="hash">{algorithm} Hash</Label>
              <div className="flex gap-2">
                <Input id="hash" value={hash} readOnly className="font-mono text-sm" />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(hash)}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
