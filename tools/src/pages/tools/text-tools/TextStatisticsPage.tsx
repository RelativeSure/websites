import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, FileText, Clock, TrendingUp } from "lucide-react";

interface Stats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  spaces: number;
  punctuation: number;
  digits: number;
  uppercase: number;
  lowercase: number;
  uniqueWords: number;
  averageWordLength: number;
  averageSentenceLength: number;
  readingTime: number;
  speakingTime: number;
  longestWord: string;
  shortestWord: string;
  wordFrequency: Array<{ word: string; count: number }>;
  readabilityScore: number;
}

export default function TextStatisticsPage() {
  const [text, setText] = useState("");

  const stats = useMemo((): Stats => {
    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        spaces: 0,
        punctuation: 0,
        digits: 0,
        uppercase: 0,
        lowercase: 0,
        uniqueWords: 0,
        averageWordLength: 0,
        averageSentenceLength: 0,
        readingTime: 0,
        speakingTime: 0,
        longestWord: "",
        shortestWord: "",
        wordFrequency: [],
        readabilityScore: 0,
      };
    }

    // Basic counts
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const spaces = characters - charactersNoSpaces;

    // Words
    const wordMatches = text.match(/\b[\w'-]+\b/g) || [];
    const words = wordMatches.length;
    const wordsLower = wordMatches.map((w) => w.toLowerCase());
    const uniqueWords = new Set(wordsLower).size;

    // Sentences (split by .!?)
    const sentences = (text.match(/[.!?]+/g) || []).length || (words > 0 ? 1 : 0);

    // Paragraphs (split by double newline or more)
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;

    // Lines
    const lines = text.split("\n").length;

    // Character types
    const punctuation = (text.match(/[.,!?;:'"(){}\[\]<>\/\\|@#$%^&*+=_~`-]/g) || []).length;
    const digits = (text.match(/\d/g) || []).length;
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;

    // Word analysis
    const wordLengths = wordMatches.map((w) => w.length);
    const averageWordLength =
      wordLengths.length > 0
        ? wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length
        : 0;

    const averageSentenceLength = sentences > 0 ? words / sentences : 0;

    // Longest and shortest words
    const sortedByLength = [...wordMatches].sort((a, b) => b.length - a.length);
    const longestWord = sortedByLength[0] || "";
    const shortestWord = sortedByLength[sortedByLength.length - 1] || "";

    // Reading time (average 200 words per minute)
    const readingTime = words / 200;

    // Speaking time (average 130 words per minute)
    const speakingTime = words / 130;

    // Word frequency (top 10)
    const frequency = new Map<string, number>();
    wordsLower.forEach((word) => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });
    const wordFrequency = Array.from(frequency.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Simple readability score (Flesch Reading Ease approximation)
    // Score = 206.835 - 1.015 × (words/sentences) - 84.6 × (syllables/words)
    // We'll use a simplified version with character count as syllable proxy
    const avgSyllablesPerWord = averageWordLength / 2.5; // rough approximation
    const readabilityScore = Math.max(
      0,
      Math.min(
        100,
        206.835 - 1.015 * averageSentenceLength - 84.6 * avgSyllablesPerWord
      )
    );

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      spaces,
      punctuation,
      digits,
      uppercase,
      lowercase,
      uniqueWords,
      averageWordLength,
      averageSentenceLength,
      readingTime,
      speakingTime,
      longestWord,
      shortestWord,
      wordFrequency,
      readabilityScore,
    };
  }, [text]);

  const formatTime = (minutes: number): string => {
    if (minutes < 1) {
      return `${Math.round(minutes * 60)} seconds`;
    }
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const getReadabilityLevel = (score: number): string => {
    if (score >= 90) return "Very Easy (5th grade)";
    if (score >= 80) return "Easy (6th grade)";
    if (score >= 70) return "Fairly Easy (7th grade)";
    if (score >= 60) return "Standard (8th-9th grade)";
    if (score >= 50) return "Fairly Difficult (10th-12th grade)";
    if (score >= 30) return "Difficult (College)";
    return "Very Difficult (College graduate)";
  };

  const exampleText = `The art of writing is the art of discovering what you believe. Writing is thinking on paper. Every word you write is a step toward understanding yourself and the world around you.

Good writing requires clarity, precision, and careful attention to detail. It demands that you know your audience and understand their needs. Most importantly, it requires practice and persistence.

Whether you're crafting a novel, composing an email, or jotting down notes, the principles remain the same: be clear, be concise, and be compelling.`;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Advanced Text Statistics</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of text with detailed statistics and readability metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Text Input
            </CardTitle>
            <CardDescription>
              Enter or paste your text to analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to analyze..."
              className="min-h-[400px]"
            />
            {!text && (
              <div className="mt-4">
                <button
                  onClick={() => setText(exampleText)}
                  className="text-sm text-primary hover:underline"
                >
                  Load example text
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Counts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters:</span>
                <span className="font-semibold">{stats.characters.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters (no spaces):</span>
                <span className="font-semibold">
                  {stats.charactersNoSpaces.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Words:</span>
                <span className="font-semibold">{stats.words.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sentences:</span>
                <span className="font-semibold">{stats.sentences.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paragraphs:</span>
                <span className="font-semibold">{stats.paragraphs.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lines:</span>
                <span className="font-semibold">{stats.lines.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Reading Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reading:</span>
                <span className="font-semibold">{formatTime(stats.readingTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speaking:</span>
                <span className="font-semibold">{formatTime(stats.speakingTime)}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Based on 200 wpm reading, 130 wpm speaking
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Character Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spaces:</span>
              <span className="font-semibold">{stats.spaces.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Punctuation:</span>
              <span className="font-semibold">{stats.punctuation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Digits:</span>
              <span className="font-semibold">{stats.digits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uppercase:</span>
              <span className="font-semibold">{stats.uppercase.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lowercase:</span>
              <span className="font-semibold">{stats.lowercase.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Word Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unique words:</span>
              <span className="font-semibold">{stats.uniqueWords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg word length:</span>
              <span className="font-semibold">
                {stats.averageWordLength.toFixed(1)} chars
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg sentence length:</span>
              <span className="font-semibold">
                {stats.averageSentenceLength.toFixed(1)} words
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longest word:</span>
              <span className="font-semibold text-xs truncate max-w-[150px]">
                {stats.longestWord || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shortest word:</span>
              <span className="font-semibold">{stats.shortestWord || "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Readability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <div className="text-muted-foreground mb-2">Flesch Reading Ease:</div>
              <div className="text-3xl font-bold text-primary mb-1">
                {stats.readabilityScore.toFixed(0)}
              </div>
              <div className="text-xs text-muted-foreground">
                {getReadabilityLevel(stats.readabilityScore)}
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-4">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${Math.min(100, stats.readabilityScore)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {stats.wordFrequency.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Most Frequent Words</CardTitle>
            <CardDescription>
              Words sorted by frequency of occurrence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {stats.wordFrequency.map(({ word, count }, index) => (
                <div
                  key={index}
                  className="border rounded p-3 text-center bg-muted/50"
                >
                  <div className="text-sm font-semibold mb-1">{word}</div>
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-xs text-muted-foreground">occurrences</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Text Statistics</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This tool provides comprehensive text analysis including character counts,
            word statistics, readability metrics, and more.
          </p>
          <p>
            <strong>Readability Score:</strong> Based on the Flesch Reading Ease formula,
            which considers average sentence length and word complexity. Higher scores
            indicate easier readability.
          </p>
          <p>
            <strong>Use cases:</strong> Content writing, SEO optimization, academic
            writing, speech preparation, and document analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
