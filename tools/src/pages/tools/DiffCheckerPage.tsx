import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitCompare } from "lucide-react";

interface DiffLine {
  type: "equal" | "added" | "removed";
  content: string;
  lineNumber: number;
}

export default function DiffCheckerPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);

  const computeDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: DiffLine[] = [];

    // Simple diff algorithm - line by line comparison
    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];

      if (line1 === line2) {
        result.push({
          type: "equal",
          content: line1 || "",
          lineNumber: i + 1,
        });
      } else {
        if (line1 !== undefined) {
          result.push({
            type: "removed",
            content: line1,
            lineNumber: i + 1,
          });
        }
        if (line2 !== undefined) {
          result.push({
            type: "added",
            content: line2,
            lineNumber: i + 1,
          });
        }
      }
    }

    setDiff(result);
  };

  const getLineStyle = (type: string) => {
    switch (type) {
      case "added":
        return "bg-green-100 dark:bg-green-950 border-l-4 border-green-500";
      case "removed":
        return "bg-red-100 dark:bg-red-950 border-l-4 border-red-500";
      default:
        return "bg-muted/30";
    }
  };

  const getLinePrefix = (type: string) => {
    switch (type) {
      case "added":
        return "+ ";
      case "removed":
        return "- ";
      default:
        return "  ";
    }
  };

  const stats = {
    additions: diff.filter((d) => d.type === "added").length,
    deletions: diff.filter((d) => d.type === "removed").length,
    unchanged: diff.filter((d) => d.type === "equal").length,
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Diff Checker</h1>
        <p className="text-muted-foreground">
          Compare two text blocks and see the differences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
            <CardDescription>Enter your original text</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste your original text here..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
            <CardDescription>Enter your modified text</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste your modified text here..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <Button onClick={computeDiff} className="w-full mb-6">
        <GitCompare className="mr-2 h-4 w-4" />
        Compare Texts
      </Button>

      {diff.length > 0 && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    +{stats.additions}
                  </div>
                  <div className="text-sm text-muted-foreground">Additions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    -{stats.deletions}
                  </div>
                  <div className="text-sm text-muted-foreground">Deletions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">
                    {stats.unchanged}
                  </div>
                  <div className="text-sm text-muted-foreground">Unchanged</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Differences</CardTitle>
              <CardDescription>
                Green lines are additions, red lines are deletions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {diff.map((line, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded font-mono text-sm ${getLineStyle(
                      line.type
                    )}`}
                  >
                    <span className="text-muted-foreground mr-2">
                      {line.lineNumber}
                    </span>
                    <span className="font-bold">
                      {getLinePrefix(line.type)}
                    </span>
                    {line.content}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {diff.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            Click "Compare Texts" to see the differences
          </CardContent>
        </Card>
      )}
    </div>
  );
}
