import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type DiffLine = {
  type: "added" | "removed" | "unchanged";
  content: string;
  lineNumber?: number;
};

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const diff = useMemo(() => {
    if (!text1 && !text2) return [];

    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: DiffLine[] = [];

    // Simple line-by-line diff using LCS approach
    const lcs = computeLCS(lines1, lines2);

    let i = 0,
      j = 0;
    for (const line of lcs) {
      // Add removed lines
      while (i < lines1.length && lines1[i] !== line) {
        result.push({ type: "removed", content: lines1[i], lineNumber: i + 1 });
        i++;
      }
      // Add added lines
      while (j < lines2.length && lines2[j] !== line) {
        result.push({ type: "added", content: lines2[j] });
        j++;
      }
      // Add unchanged line
      if (i < lines1.length && j < lines2.length) {
        result.push({ type: "unchanged", content: line, lineNumber: i + 1 });
        i++;
        j++;
      }
    }

    // Add remaining removed lines
    while (i < lines1.length) {
      result.push({ type: "removed", content: lines1[i], lineNumber: i + 1 });
      i++;
    }

    // Add remaining added lines
    while (j < lines2.length) {
      result.push({ type: "added", content: lines2[j] });
      j++;
    }

    return result;
  }, [text1, text2]);

  const computeLCS = (arr1: string[], arr2: string[]): string[] => {
    const m = arr1.length;
    const n = arr2.length;
    const dp: number[][] = Array(m + 1)
      .fill(0)
      .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (arr1[i - 1] === arr2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const lcs: string[] = [];
    let i = m,
      j = n;
    while (i > 0 && j > 0) {
      if (arr1[i - 1] === arr2[j - 1]) {
        lcs.unshift(arr1[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    return lcs;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Text Diff Checker</h1>
        <p className="text-muted-foreground">Compare two text blocks and see the differences (+ added, - removed)</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
            <CardDescription>Enter the first text</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              placeholder="Enter original text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="font-mono flex-1 resize-none min-h-[300px]"
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
            <CardDescription>Enter the second text</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              placeholder="Enter modified text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="font-mono flex-1 resize-none min-h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      {diff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Differences</CardTitle>
            <CardDescription>Lines prefixed with - are removed, + are added</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-muted p-4 rounded-md overflow-x-auto max-h-[500px] overflow-y-auto">
              {diff.map((line, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    line.type === "added"
                      ? "text-green-600 dark:text-green-400 bg-green-500/10"
                      : line.type === "removed"
                        ? "text-red-600 dark:text-red-400 bg-red-500/10"
                        : "text-foreground"
                  } px-2 py-0.5`}
                >
                  <span className="select-none mr-2">
                    {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                  </span>
                  {line.content || " "}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
