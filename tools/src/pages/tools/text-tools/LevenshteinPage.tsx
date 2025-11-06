import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scale, ArrowLeftRight } from "lucide-react";

export default function LevenshteinPage() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [matrix, setMatrix] = useState<number[][]>([]);

  const calculateLevenshtein = (s1: string, s2: string): number => {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= len1; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }
    for (let j = 0; j <= len2; j++) {
      dp[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,     // deletion
            dp[i][j - 1] + 1,     // insertion
            dp[i - 1][j - 1] + 1  // substitution
          );
        }
      }
    }

    setMatrix(dp);
    return dp[len1][len2];
  };

  const handleCalculate = () => {
    const dist = calculateLevenshtein(string1, string2);
    setDistance(dist);

    // Calculate similarity percentage
    const maxLen = Math.max(string1.length, string2.length);
    const similarityPercent = maxLen === 0 ? 100 : ((maxLen - dist) / maxLen) * 100;
    setSimilarity(similarityPercent);
  };

  const swapStrings = () => {
    const temp = string1;
    setString1(string2);
    setString2(temp);
  };

  const examples = [
    { s1: "kitten", s2: "sitting", desc: "Classic example" },
    { s1: "saturday", s2: "sunday", desc: "Days of the week" },
    { s1: "book", s2: "back", desc: "Similar words" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Levenshtein Distance</h1>
        <p className="text-muted-foreground">
          Calculate edit distance and string similarity between two strings
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Input Strings
          </CardTitle>
          <CardDescription>
            Enter two strings to compare
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="string1">String 1</Label>
              <Textarea
                id="string1"
                value={string1}
                onChange={(e) => setString1(e.target.value)}
                placeholder="Enter first string..."
                className="min-h-[120px] font-mono text-sm"
              />
              <div className="text-xs text-muted-foreground">
                Length: {string1.length}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="string2">String 2</Label>
              <Textarea
                id="string2"
                value={string2}
                onChange={(e) => setString2(e.target.value)}
                placeholder="Enter second string..."
                className="min-h-[120px] font-mono text-sm"
              />
              <div className="text-xs text-muted-foreground">
                Length: {string2.length}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              Calculate Distance
            </Button>
            <Button onClick={swapStrings} variant="outline" size="lg">
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {examples.map((ex, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => {
                  setString1(ex.s1);
                  setString2(ex.s2);
                }}
              >
                {ex.desc}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {distance !== null && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Edit Distance</CardTitle>
                <CardDescription>
                  Minimum operations needed to transform one string to another
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {distance}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    operations (insertions, deletions, substitutions)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similarity</CardTitle>
                <CardDescription>
                  How similar the strings are as a percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {similarity?.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    string similarity
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {matrix.length > 0 && matrix.length <= 20 && matrix[0].length <= 20 && (
            <Card>
              <CardHeader>
                <CardTitle>Distance Matrix</CardTitle>
                <CardDescription>
                  Dynamic programming table showing edit distances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="border p-2 bg-muted font-mono"></th>
                        <th className="border p-2 bg-muted font-mono"></th>
                        {string2.split("").map((char, idx) => (
                          <th key={idx} className="border p-2 bg-muted font-mono">
                            {char}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.map((row, i) => (
                        <tr key={i}>
                          <td className="border p-2 bg-muted font-mono text-center">
                            {i === 0 ? "" : string1[i - 1]}
                          </td>
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={`border p-2 text-center font-mono ${
                                i === matrix.length - 1 && j === row.length - 1
                                  ? "bg-primary text-primary-foreground font-bold"
                                  : ""
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-muted-foreground mt-4">
                  The bottom-right cell shows the final edit distance. Each cell
                  represents the minimum operations needed to transform the substring.
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Levenshtein Distance</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Levenshtein distance</strong> (also called edit distance) is a
            metric for measuring the difference between two strings.
          </p>
          <p>
            It counts the minimum number of single-character edits (insertions,
            deletions, or substitutions) required to change one string into another.
          </p>
          <p>
            <strong>Use cases:</strong> Spell checking, DNA sequence analysis, fuzzy
            string matching, plagiarism detection, and autocorrect systems.
          </p>
          <p>
            <strong>Example:</strong> "kitten" → "sitting" requires 3 operations:
            substitute k→s, substitute e→i, insert g.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
