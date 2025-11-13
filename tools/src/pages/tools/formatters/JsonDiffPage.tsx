import { GitCompare } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DiffResult {
  path: string;
  type: "added" | "removed" | "changed";
  oldValue?: any;
  newValue?: any;
}

export default function JsonDiffPage() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [diffs, setDiffs] = useState<DiffResult[]>([]);
  const [error, setError] = useState("");

  const compareJSON = (obj1: any, obj2: any, path = ""): DiffResult[] => {
    const results: DiffResult[] = [];

    // Get all unique keys from both objects
    const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})]);

    allKeys.forEach((key) => {
      const newPath = path ? `${path}.${key}` : key;
      const val1 = obj1?.[key];
      const val2 = obj2?.[key];

      const exists1 = obj1 && key in obj1;
      const exists2 = obj2 && key in obj2;

      if (!exists1 && exists2) {
        results.push({
          path: newPath,
          type: "added",
          newValue: val2,
        });
      } else if (exists1 && !exists2) {
        results.push({
          path: newPath,
          type: "removed",
          oldValue: val1,
        });
      } else if (exists1 && exists2) {
        // Both exist, check if they're different
        if (
          typeof val1 === "object" &&
          val1 !== null &&
          typeof val2 === "object" &&
          val2 !== null &&
          !Array.isArray(val1) &&
          !Array.isArray(val2)
        ) {
          // Recursively compare objects
          results.push(...compareJSON(val1, val2, newPath));
        } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          results.push({
            path: newPath,
            type: "changed",
            oldValue: val1,
            newValue: val2,
          });
        }
      }
    });

    return results;
  };

  const handleCompare = () => {
    try {
      const parsed1 = json1 ? JSON.parse(json1) : {};
      const parsed2 = json2 ? JSON.parse(json2) : {};

      const differences = compareJSON(parsed1, parsed2);
      setDiffs(differences);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setDiffs([]);
    }
  };

  const formatValue = (value: any): string => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "added":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "removed":
        return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300";
      case "changed":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300";
      default:
        return "";
    }
  };

  const stats = {
    added: diffs.filter((d) => d.type === "added").length,
    removed: diffs.filter((d) => d.type === "removed").length,
    changed: diffs.filter((d) => d.type === "changed").length,
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON Diff</h1>
        <p className="text-muted-foreground">Compare two JSON objects and visualize differences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Original JSON</CardTitle>
            <CardDescription>Enter your original JSON</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modified JSON</CardTitle>
            <CardDescription>Enter your modified JSON</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              placeholder='{"name": "Jane", "age": 30, "city": "NYC"}'
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-red-700 dark:text-red-300">
          <strong>Error:</strong> {error}
        </div>
      )}

      <Button onClick={handleCompare} className="w-full mb-6">
        <GitCompare className="mr-2 h-4 w-4" />
        Compare JSON Objects
      </Button>

      {diffs.length > 0 && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">+{stats.added}</div>
                  <div className="text-sm text-muted-foreground">Added</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">-{stats.removed}</div>
                  <div className="text-sm text-muted-foreground">Removed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">±{stats.changed}</div>
                  <div className="text-sm text-muted-foreground">Changed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Differences ({diffs.length})</CardTitle>
              <CardDescription>Green = added, Red = removed, Yellow = changed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {diffs.map((diff, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-md border-l-4 ${
                      diff.type === "added"
                        ? "bg-green-50 dark:bg-green-950/30 border-green-500"
                        : diff.type === "removed"
                          ? "bg-red-50 dark:bg-red-950/30 border-red-500"
                          : "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(diff.type)}>{diff.type.toUpperCase()}</Badge>
                      <code className="text-sm font-mono">{diff.path}</code>
                    </div>
                    {diff.type === "removed" && (
                      <div className="font-mono text-sm">
                        <span className="text-red-600 dark:text-red-400">- {formatValue(diff.oldValue)}</span>
                      </div>
                    )}
                    {diff.type === "added" && (
                      <div className="font-mono text-sm">
                        <span className="text-green-600 dark:text-green-400">+ {formatValue(diff.newValue)}</span>
                      </div>
                    )}
                    {diff.type === "changed" && (
                      <div className="font-mono text-sm space-y-1">
                        <div className="text-red-600 dark:text-red-400">- {formatValue(diff.oldValue)}</div>
                        <div className="text-green-600 dark:text-green-400">+ {formatValue(diff.newValue)}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {diffs.length === 0 && !error && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            {json1 && json2 ? "No differences found" : 'Enter JSON in both fields and click "Compare"'}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
