import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function TextToolsPage() {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const lineCount = text ? text.split("\n").length : 0;
  const paragraphCount = text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0;

  const sortLines = (order: "asc" | "desc") => {
    const lines = text.split("\n");
    lines.sort();
    if (order === "desc") lines.reverse();
    setText(lines.join("\n"));
  };

  const removeDuplicateLines = () => {
    const lines = text.split("\n");
    const unique = Array.from(new Set(lines));
    setText(unique.join("\n"));
  };

  const removeEmptyLines = () => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    setText(lines.join("\n"));
  };

  const reverseText = () => {
    setText(text.split("").reverse().join(""));
  };

  const reverseWords = () => {
    setText(text.split(" ").reverse().join(" "));
  };

  const reverseLines = () => {
    setText(text.split("\n").reverse().join("\n"));
  };

  const findAndReplace = (replaceAll: boolean) => {
    if (!findText) return;
    if (replaceAll) {
      setText(text.split(findText).join(replaceText));
    } else {
      setText(text.replace(findText, replaceText));
    }
  };

  const numberLines = () => {
    const lines = text.split("\n");
    const numbered = lines.map((line, i) => `${i + 1}. ${line}`);
    setText(numbered.join("\n"));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Text Tools</h1>
        <p className="text-muted-foreground">Advanced text manipulation and analysis tools</p>
      </div>

      <Tabs defaultValue="counter" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="counter">Counter</TabsTrigger>
          <TabsTrigger value="manipulate">Manipulate</TabsTrigger>
          <TabsTrigger value="find">Find & Replace</TabsTrigger>
        </TabsList>

        <TabsContent value="counter">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Text Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                className="font-mono min-h-[300px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{wordCount}</div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{charCount}</div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{charCountNoSpaces}</div>
                  <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{lineCount}</div>
                  <div className="text-sm text-muted-foreground">Lines</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{paragraphCount}</div>
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-2xl font-bold">{Math.ceil(wordCount / 200)}</div>
                  <div className="text-sm text-muted-foreground">Reading time (min)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manipulate">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Text Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                className="font-mono min-h-[300px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manipulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Sort Lines</Label>
                  <div className="flex gap-2">
                    <Button onClick={() => sortLines("asc")} variant="outline" className="flex-1">
                      Sort A-Z
                    </Button>
                    <Button onClick={() => sortLines("desc")} variant="outline" className="flex-1">
                      Sort Z-A
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Reverse</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button onClick={reverseText} variant="outline">
                      Text
                    </Button>
                    <Button onClick={reverseWords} variant="outline">
                      Words
                    </Button>
                    <Button onClick={reverseLines} variant="outline">
                      Lines
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Clean Up</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={removeDuplicateLines} variant="outline">
                      Remove Duplicates
                    </Button>
                    <Button onClick={removeEmptyLines} variant="outline">
                      Remove Empty Lines
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Other</Label>
                  <Button onClick={numberLines} variant="outline" className="w-full">
                    Number Lines
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="find">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Text Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                className="font-mono min-h-[300px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Find & Replace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="find">Find</Label>
                <Input
                  id="find"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="Text to find..."
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="replace">Replace with</Label>
                <Input
                  id="replace"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Replacement text..."
                  className="font-mono"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => findAndReplace(false)} variant="outline" className="flex-1">
                  Replace First
                </Button>
                <Button onClick={() => findAndReplace(true)} className="flex-1">
                  Replace All
                </Button>
              </div>

              {findText && (
                <div className="p-3 bg-muted rounded-md text-sm">
                  <strong>Matches found:</strong> {text.split(findText).length - 1}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
