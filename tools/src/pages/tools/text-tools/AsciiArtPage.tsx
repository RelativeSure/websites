import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const asciiFont: Record<string, string[]> = {
  A: ["  ###  ", " ## ## ", "##   ##", "#######", "##   ##"],
  B: ["###### ", "##   ##", "###### ", "##   ##", "###### "],
  C: [" ##### ", "##   ##", "##     ", "##   ##", " ##### "],
  D: ["###### ", "##   ##", "##   ##", "##   ##", "###### "],
  E: ["#######", "##     ", "##### ", "##     ", "#######"],
  F: ["#######", "##     ", "##### ", "##     ", "##     "],
  G: [" ##### ", "##     ", "##  ###", "##   ##", " ##### "],
  H: ["##   ##", "##   ##", "#######", "##   ##", "##   ##"],
  I: ["#######", "   ##  ", "   ##  ", "   ##  ", "#######"],
  J: ["#######", "    ## ", "    ## ", "##  ## ", " ####  "],
  K: ["##   ##", "##  ## ", "#####  ", "##  ## ", "##   ##"],
  L: ["##     ", "##     ", "##     ", "##     ", "#######"],
  M: ["##   ##", "### ###", "## # ##", "##   ##", "##   ##"],
  N: ["##   ##", "###  ##", "## # ##", "##  ###", "##   ##"],
  O: [" ##### ", "##   ##", "##   ##", "##   ##", " ##### "],
  P: ["###### ", "##   ##", "###### ", "##     ", "##     "],
  Q: [" ##### ", "##   ##", "##   ##", "## # ##", " ### ##"],
  R: ["###### ", "##   ##", "###### ", "##  ## ", "##   ##"],
  S: [" ##### ", "##     ", " ##### ", "     ##", " ##### "],
  T: ["#######", "   ##  ", "   ##  ", "   ##  ", "   ##  "],
  U: ["##   ##", "##   ##", "##   ##", "##   ##", " ##### "],
  V: ["##   ##", "##   ##", "##   ##", " ## ## ", "  ###  "],
  W: ["##   ##", "##   ##", "## # ##", "### ###", "##   ##"],
  X: ["##   ##", " ## ## ", "  ###  ", " ## ## ", "##   ##"],
  Y: ["##   ##", " ## ## ", "  ###  ", "   ##  ", "   ##  "],
  Z: ["#######", "    ## ", "  ###  ", " ##    ", "#######"],
  " ": ["       ", "       ", "       ", "       ", "       "],
  "0": [" ##### ", "##   ##", "##   ##", "##   ##", " ##### "],
  "1": ["   ##  ", "  ###  ", "   ##  ", "   ##  ", " ##### "],
  "2": [" ##### ", "     ##", " ##### ", "##     ", "#######"],
  "3": [" ##### ", "     ##", "  #### ", "     ##", " ##### "],
  "4": ["##   ##", "##   ##", "#######", "     ##", "     ##"],
  "5": ["#######", "##     ", "###### ", "     ##", "###### "],
  "6": [" ##### ", "##     ", "###### ", "##   ##", " ##### "],
  "7": ["#######", "     ##", "    ## ", "   ##  ", "  ##   "],
  "8": [" ##### ", "##   ##", " ##### ", "##   ##", " ##### "],
  "9": [" ##### ", "##   ##", " ######", "     ##", " ##### "],
};

export default function AsciiArtPage() {
  const [text, setText] = useState("");
  const [asciiArt, setAsciiArt] = useState("");
  const [copied, setCopied] = useState(false);

  const generateAscii = () => {
    const upperText = text.toUpperCase();
    const lines = ["", "", "", "", ""];

    for (const char of upperText) {
      const charArt = asciiFont[char] || asciiFont[" "];
      for (let i = 0; i < 5; i++) {
        lines[i] += `${charArt[i]} `;
      }
    }

    setAsciiArt(lines.join("\n"));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(asciiArt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const templates = [
    {
      name: "Happy Face",
      art: `
    ^__^
   (oo)\\_______
   (__)\\       )\\/\\
       ||----w |
       ||     ||
`.trim(),
    },
    {
      name: "Computer",
      art: `
 ___________________
|  _______________ |
| |               | |
| |  $ █          | |
| |               | |
| |_______________| |
|___________________|
  _[_______]_______
 |_________________|
`.trim(),
    },
    {
      name: "Heart",
      art: `
  ♥♥♥    ♥♥♥
♥♥   ♥♥♥    ♥♥
♥      ♥      ♥
♥             ♥
 ♥           ♥
  ♥         ♥
   ♥       ♥
    ♥     ♥
     ♥   ♥
      ♥ ♥
       ♥
`.trim(),
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ASCII Art Generator</h1>
        <p className="text-muted-foreground">Convert text to ASCII art</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Text to ASCII</CardTitle>
          <CardDescription>Enter text to convert (letters and numbers only)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground">Max 20 characters (letters, numbers, spaces)</p>
          </div>

          <Button onClick={generateAscii} className="w-full">
            Generate ASCII Art
          </Button>
        </CardContent>
      </Card>

      {asciiArt && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated ASCII Art</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
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
            <pre className="p-4 bg-muted rounded-md text-xs overflow-x-auto">{asciiArt}</pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Templates</CardTitle>
          <CardDescription>Pre-made ASCII art</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {templates.map((template, i) => (
            <div key={i} className="space-y-2">
              <div className="font-semibold text-sm">{template.name}</div>
              <pre className="p-4 bg-muted rounded-md text-xs overflow-x-auto">{template.art}</pre>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
