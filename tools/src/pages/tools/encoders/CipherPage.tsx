import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CipherPage() {
  const [text, setText] = useState("");
  const [rot13Result, setRot13Result] = useState("");
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarResult, setCaesarResult] = useState("");

  const rot13Transform = () => {
    const result = text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
    setRot13Result(result);
  };

  const caesarTransform = (direction: "encode" | "decode") => {
    const shift = direction === "encode" ? caesarShift : -caesarShift;
    const result = text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift + 26) % 26) + start);
    });
    setCaesarResult(result);
  };

  const atbashTransform = () => {
    const result = text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(start + (25 - (char.charCodeAt(0) - start)));
    });
    setRot13Result(result);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cipher Tools</h1>
        <p className="text-muted-foreground">
          Simple substitution ciphers: ROT13, Caesar, and Atbash
        </p>
      </div>

      <Tabs defaultValue="rot13" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rot13">ROT13</TabsTrigger>
          <TabsTrigger value="caesar">Caesar Cipher</TabsTrigger>
          <TabsTrigger value="atbash">Atbash</TabsTrigger>
        </TabsList>

        <TabsContent value="rot13">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ROT13</CardTitle>
              <CardDescription>
                Rotate each letter 13 positions (encode = decode)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text here..."
                  className="font-mono min-h-[150px]"
                />
              </div>

              <Button onClick={rot13Transform} className="w-full">
                Transform (ROT13)
              </Button>

              <div className="space-y-2">
                <Label>Output</Label>
                <Textarea
                  value={rot13Result}
                  readOnly
                  placeholder="Transformed text will appear here..."
                  className="font-mono min-h-[150px] bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About ROT13</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                ROT13 is a simple letter substitution cipher that replaces a letter with
                the letter 13 positions after it in the alphabet.
              </p>
              <p>
                Since there are 26 letters, applying ROT13 twice returns the original text.
                It's commonly used to hide spoilers or puzzle solutions.
              </p>
              <p className="font-mono text-xs">
                Example: "HELLO" → "URYYB"
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="caesar">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Caesar Cipher</CardTitle>
              <CardDescription>
                Shift letters by a custom amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text here..."
                  className="font-mono min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shift">Shift Amount: {caesarShift}</Label>
                <input
                  id="shift"
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>25</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => caesarTransform("encode")} className="flex-1">
                  Encode
                </Button>
                <Button onClick={() => caesarTransform("decode")} variant="outline" className="flex-1">
                  Decode
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Output</Label>
                <Textarea
                  value={caesarResult}
                  readOnly
                  placeholder="Transformed text will appear here..."
                  className="font-mono min-h-[150px] bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Caesar Cipher</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                The Caesar cipher is one of the earliest known encryption techniques.
                Each letter is replaced by a letter a fixed number of positions down the alphabet.
              </p>
              <p className="font-mono text-xs">
                Example with shift 3: "HELLO" → "KHOOR"
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atbash">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Atbash Cipher</CardTitle>
              <CardDescription>
                Reverse the alphabet (A↔Z, B↔Y, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Input Text</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text here..."
                  className="font-mono min-h-[150px]"
                />
              </div>

              <Button onClick={atbashTransform} className="w-full">
                Transform (Atbash)
              </Button>

              <div className="space-y-2">
                <Label>Output</Label>
                <Textarea
                  value={rot13Result}
                  readOnly
                  placeholder="Transformed text will appear here..."
                  className="font-mono min-h-[150px] bg-muted"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Atbash</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Atbash is a monoalphabetic substitution cipher originally used for the Hebrew alphabet.
                Each letter is replaced with its reverse: A↔Z, B↔Y, C↔X, and so on.
              </p>
              <p className="font-mono text-xs">
                Example: "HELLO" → "SVOOL"
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
