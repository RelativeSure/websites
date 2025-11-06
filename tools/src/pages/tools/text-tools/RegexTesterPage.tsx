import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegExpMatchArray[] | null>(null);
  const [error, setError] = useState("");

  const testRegex = (patternValue: string, flagsValue: string, testValue: string) => {
    setPattern(patternValue);
    setFlags(flagsValue);
    setTestString(testValue);

    if (!patternValue) {
      setMatches(null);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(patternValue, flagsValue);
      const allMatches: RegExpMatchArray[] = [];

      if (flagsValue.includes("g")) {
        let match;
        while ((match = regex.exec(testValue)) !== null) {
          allMatches.push(match);
        }
      } else {
        const match = testValue.match(regex);
        if (match) allMatches.push(match);
      }

      setMatches(allMatches);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regular expression");
      setMatches(null);
    }
  };

  const highlightMatches = () => {
    if (!testString || !matches || matches.length === 0) {
      return testString;
    }

    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    const sortedMatches = [...matches].sort((a, b) => (a.index || 0) - (b.index || 0));

    for (const match of sortedMatches) {
      const matchIndex = match.index || 0;

      if (matchIndex > lastIndex) {
        parts.push({ text: testString.slice(lastIndex, matchIndex), isMatch: false });
      }

      parts.push({ text: match[0], isMatch: true });
      lastIndex = matchIndex + match[0].length;
    }

    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), isMatch: false });
    }

    return parts;
  };

  const parts = highlightMatches();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Regex Tester</h1>
        <p className="text-muted-foreground">
          Test and debug regular expressions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regular Expression</CardTitle>
              <CardDescription>Enter your regex pattern</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pattern">Pattern</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-mono text-muted-foreground">/</span>
                  <Input
                    id="pattern"
                    value={pattern}
                    onChange={(e) => testRegex(e.target.value, flags, testString)}
                    placeholder="[A-Z]\w+"
                    className="font-mono flex-1"
                  />
                  <span className="text-lg font-mono text-muted-foreground">/</span>
                  <Input
                    value={flags}
                    onChange={(e) => testRegex(pattern, e.target.value, testString)}
                    placeholder="g"
                    className="font-mono w-16"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Flags: g (global), i (case-insensitive), m (multiline), s (dotall), u (unicode), y (sticky)
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test String</CardTitle>
              <CardDescription>Enter text to test against the pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={testString}
                onChange={(e) => testRegex(pattern, flags, e.target.value)}
                placeholder="Enter text to test..."
                className="font-mono min-h-[200px]"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matches ({matches?.length || 0})</CardTitle>
              <CardDescription>Highlighted matches in the test string</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-md min-h-[200px] font-mono text-sm whitespace-pre-wrap break-words">
                {Array.isArray(parts) ? (
                  parts.map((part, i) => (
                    <span
                      key={i}
                      className={
                        part.isMatch
                          ? "bg-primary/30 text-primary-foreground px-1 rounded"
                          : ""
                      }
                    >
                      {part.text}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">{parts || "No test string"}</span>
                )}
              </div>
            </CardContent>
          </Card>

          {matches && matches.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Match Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {matches.map((match, i) => (
                    <div key={i} className="p-3 bg-muted rounded-md">
                      <div className="font-mono text-sm space-y-1">
                        <div>
                          <span className="text-muted-foreground">Match {i + 1}:</span>{" "}
                          <span className="text-primary">{match[0]}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Index: {match.index}
                        </div>
                        {match.length > 1 && (
                          <div className="text-xs">
                            <span className="text-muted-foreground">Groups:</span>{" "}
                            {match.slice(1).map((g, gi) => (
                              <span key={gi} className="ml-2">
                                ${gi + 1}: {g || "(empty)"}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
