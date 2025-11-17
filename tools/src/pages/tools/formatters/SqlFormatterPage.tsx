import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const formatSql = (sql: string): string => {
    if (!sql.trim()) return "";

    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "LIMIT",
      "OFFSET",
      "JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "OUTER JOIN",
      "ON",
      "AS",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE",
      "CREATE TABLE",
      "ALTER TABLE",
      "DROP TABLE",
      "PRIMARY KEY",
      "FOREIGN KEY",
      "REFERENCES",
      "NOT NULL",
      "UNIQUE",
      "DEFAULT",
      "CHECK",
      "INDEX",
      "VIEW",
      "UNION",
      "DISTINCT",
      "CASE",
      "WHEN",
      "THEN",
      "ELSE",
      "END",
      "IN",
      "BETWEEN",
      "LIKE",
      "IS NULL",
      "IS NOT NULL",
    ];

    let formatted = sql;

    // Remove extra spaces
    formatted = formatted.replace(/\s+/g, " ").trim();

    // Add newlines before major keywords
    const majorKeywords = ["SELECT", "FROM", "WHERE", "ORDER BY", "GROUP BY", "HAVING", "LIMIT"];
    majorKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formatted = formatted.replace(regex, `\n${keyword}`);
    });

    // Add newlines for JOIN clauses
    ["JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN"].forEach((join) => {
      const regex = new RegExp(`\\b${join}\\b`, "gi");
      formatted = formatted.replace(regex, `\n${join}`);
    });

    // Capitalize keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formatted = formatted.replace(regex, keyword.toUpperCase());
    });

    // Indent clauses
    const lines = formatted.split("\n");
    const indented = lines.map((line, index) => {
      line = line.trim();
      if (index === 0) return line;
      if (
        line.startsWith("SELECT") ||
        line.startsWith("FROM") ||
        line.startsWith("WHERE") ||
        line.startsWith("GROUP BY") ||
        line.startsWith("ORDER BY") ||
        line.startsWith("HAVING") ||
        line.startsWith("LIMIT")
      ) {
        return line;
      }
      if (
        line.startsWith("JOIN") ||
        line.startsWith("LEFT JOIN") ||
        line.startsWith("RIGHT JOIN") ||
        line.startsWith("INNER JOIN") ||
        line.startsWith("OUTER JOIN")
      ) {
        return `  ${line}`;
      }
      if (line.startsWith("AND") || line.startsWith("OR")) {
        return `  ${line}`;
      }
      return `  ${line}`;
    });

    return indented.join("\n").trim();
  };

  const format = () => {
    setOutput(formatSql(input));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">SQL Formatter</h1>
        <p className="text-muted-foreground">Format and beautify SQL queries</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>SQL Input</CardTitle>
            <CardDescription>Enter SQL query to format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="SELECT * FROM users WHERE id = 1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex-1 resize-none text-sm"
            />
            <Button onClick={format} className="w-full">
              Format SQL
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Formatted SQL</CardTitle>
            <CardDescription>Formatted and beautified output</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <Textarea
              placeholder="Formatted SQL will appear here..."
              value={output}
              readOnly
              className="font-mono flex-1 resize-none text-sm"
            />
            <Button onClick={copyToClipboard} disabled={!output} variant="outline" className="w-full">
              {copied ? (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 w-4 h-4" />
                  Copy SQL
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
