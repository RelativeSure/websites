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
import { ArrowRightLeft, Copy, Check, AlertCircle } from "lucide-react";

export default function SqlToJsonPage() {
  const [sql, setSql] = useState("");
  const [json, setJson] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const parseSqlInsert = (sqlStatement: string): any[] => {
    // Match INSERT INTO statements
    const insertRegex = /INSERT\s+INTO\s+`?(\w+)`?\s*\((.*?)\)\s+VALUES\s+(.*?)(?:;|$)/gis;
    const match = insertRegex.exec(sqlStatement);

    if (!match) {
      throw new Error("Invalid INSERT statement format");
    }

    const tableName = match[1];
    const columnsStr = match[2];
    const valuesStr = match[3];

    // Parse column names
    const columns = columnsStr.split(",").map((col) => col.trim().replace(/`/g, ""));

    // Parse values - handle multiple value sets
    const valuePattern = /\((.*?)\)/gs;
    const valueSets: string[][] = [];
    let valueMatch;

    while ((valueMatch = valuePattern.exec(valuesStr)) !== null) {
      const values = valueMatch[1];
      const parsedValues: string[] = [];
      let current = "";
      let inString = false;
      let stringChar = "";

      for (let i = 0; i < values.length; i++) {
        const char = values[i];

        if ((char === "'" || char === '"') && (i === 0 || values[i - 1] !== "\\")) {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
            stringChar = "";
          } else {
            current += char;
          }
        } else if (char === "," && !inString) {
          parsedValues.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }

      if (current.trim()) {
        parsedValues.push(current.trim());
      }

      valueSets.push(parsedValues);
    }

    // Convert to JSON objects
    const results = valueSets.map((valueSet) => {
      const obj: any = { _table: tableName };
      columns.forEach((col, index) => {
        let value = valueSet[index];

        // Remove quotes
        if ((value.startsWith("'") && value.endsWith("'")) ||
            (value.startsWith('"') && value.endsWith('"'))) {
          value = value.slice(1, -1);
        }

        // Handle NULL
        if (value.toUpperCase() === "NULL") {
          obj[col] = null;
        }
        // Handle numbers
        else if (/^-?\d+(\.\d+)?$/.test(value)) {
          obj[col] = parseFloat(value);
        }
        // Handle booleans
        else if (value.toUpperCase() === "TRUE") {
          obj[col] = true;
        } else if (value.toUpperCase() === "FALSE") {
          obj[col] = false;
        }
        // String value
        else {
          obj[col] = value;
        }
      });
      return obj;
    });

    return results;
  };

  const convert = () => {
    setError("");
    setJson("");

    if (!sql.trim()) {
      setError("Please enter SQL to convert");
      return;
    }

    try {
      const results = parseSqlInsert(sql);
      setJson(JSON.stringify(results, null, 2));
    } catch (err) {
      setError("Failed to parse SQL: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exampleSql = `INSERT INTO users (id, name, email, age, active) VALUES
(1, 'John Doe', 'john@example.com', 30, TRUE),
(2, 'Jane Smith', 'jane@example.com', 25, TRUE),
(3, 'Bob Johnson', 'bob@example.com', 35, FALSE);`;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">SQL to JSON Converter</h1>
        <p className="text-muted-foreground">
          Convert SQL INSERT statements to JSON format
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>SQL Input</CardTitle>
            <CardDescription>
              Enter your SQL INSERT statement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              placeholder="INSERT INTO table (col1, col2) VALUES (val1, val2);"
              className="font-mono text-sm min-h-[400px]"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSql(exampleSql)}
            >
              Load Example
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>JSON Output</CardTitle>
                <CardDescription>
                  Converted JSON data
                </CardDescription>
              </div>
              {json && (
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
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={json}
              readOnly
              placeholder="JSON output will appear here..."
              className="font-mono text-sm min-h-[400px] bg-muted"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mb-6">
        <Button onClick={convert} size="lg">
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Convert to JSON
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md mb-6">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Conversion Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This tool converts SQL INSERT statements into JSON format, making it easy
            to use SQL data in JavaScript applications or APIs.
          </p>
          <div>
            <strong>Supported features:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>Single and multiple INSERT VALUES</li>
              <li>String values (single and double quotes)</li>
              <li>Numeric values (integers and decimals)</li>
              <li>Boolean values (TRUE/FALSE)</li>
              <li>NULL values</li>
              <li>Table name included as "_table" field</li>
            </ul>
          </div>
          <p>
            <strong>Note:</strong> This is a simplified parser for basic INSERT statements.
            Complex SQL with nested queries, functions, or special syntax may not be supported.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
