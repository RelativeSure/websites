import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function StringCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    paragraphs: 0,
    sentences: 0,
  });

  useEffect(() => {
    const trimmed = text;
    const withoutSpaces = text.replace(/\s/g, "");
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const lines = text.split("\n");
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0);
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    setStats({
      characters: trimmed.length,
      charactersNoSpaces: withoutSpaces.length,
      words: text.trim() ? words.length : 0,
      lines: text ? lines.length : 0,
      paragraphs: paragraphs.length,
      sentences: sentences.length,
    });
  }, [text]);

  const StatCard = ({ label, value, description }: { label: string; value: number; description: string }) => (
    <div className="p-4 bg-muted rounded-lg">
      <div className="text-3xl font-bold text-primary">{value.toLocaleString()}</div>
      <div className="text-sm font-semibold mt-1">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Text Analyzer</h1>
        <p className="text-muted-foreground">Count characters, words, lines, and more</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Text Input</CardTitle>
              <CardDescription>Enter or paste your text</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="font-mono min-h-[400px] text-sm"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Real-time text analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatCard label="Characters" value={stats.characters} description="Total characters" />
              <StatCard
                label="Characters (no spaces)"
                value={stats.charactersNoSpaces}
                description="Without whitespace"
              />
              <StatCard label="Words" value={stats.words} description="Space-separated" />
              <StatCard label="Lines" value={stats.lines} description="Line breaks" />
              <StatCard label="Paragraphs" value={stats.paragraphs} description="Double line breaks" />
              <StatCard label="Sentences" value={stats.sentences} description="Period/exclamation/question" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
