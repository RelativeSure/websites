import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator, History, Trash2 } from "lucide-react";

interface HistoryItem {
  expression: string;
  result: string;
}

export default function ExpressionEvaluatorPage() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const safeEval = (expr: string): number => {
    // Remove any potentially dangerous characters
    const sanitized = expr.replace(/[^0-9+\-*/().%\s]/g, "");

    if (sanitized !== expr) {
      throw new Error("Invalid characters in expression");
    }

    // Use Function constructor for safer evaluation than eval
    try {
      const fn = new Function("return " + sanitized);
      const result = fn();

      if (typeof result !== "number" || !isFinite(result)) {
        throw new Error("Result is not a valid number");
      }

      return result;
    } catch (err) {
      throw new Error("Invalid expression");
    }
  };

  const calculate = () => {
    try {
      if (!expression.trim()) {
        setError("Please enter an expression");
        return;
      }

      const evalResult = safeEval(expression);
      const resultStr = evalResult.toString();

      setResult(resultStr);
      setError("");

      // Add to history
      setHistory([{ expression, result: resultStr }, ...history.slice(0, 9)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useFromHistory = (item: HistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
  };

  const operators = [
    { symbol: "+", name: "Add", example: "5 + 3 = 8" },
    { symbol: "-", name: "Subtract", example: "10 - 4 = 6" },
    { symbol: "*", name: "Multiply", example: "6 * 7 = 42" },
    { symbol: "/", name: "Divide", example: "20 / 4 = 5" },
    { symbol: "%", name: "Modulo", example: "10 % 3 = 1" },
    { symbol: "()", name: "Parentheses", example: "(2 + 3) * 4 = 20" },
  ];

  const examples = [
    "2 + 2",
    "10 * (5 + 3)",
    "100 / 4 - 10",
    "(15 + 5) * 2 / 4",
    "50 % 7",
    "3.14 * 2.5",
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Expression Evaluator</h1>
        <p className="text-muted-foreground">
          Calculate mathematical expressions safely
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculator
          </CardTitle>
          <CardDescription>
            Enter a mathematical expression to evaluate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter expression (e.g., 2 + 2 * 3)"
              className="text-2xl font-mono text-center h-16"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <Button onClick={calculate} className="w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate
          </Button>

          {result && (
            <div className="p-6 bg-primary/10 border-2 border-primary rounded-md text-center">
              <div className="text-sm text-muted-foreground mb-2">Result</div>
              <div className="text-5xl font-bold font-mono text-primary">
                {result}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Supported Operators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {operators.map((op, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="font-semibold">{op.name}</div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {op.example}
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-mono">{op.symbol}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example Expressions</CardTitle>
            <CardDescription>Click to use an example</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setExpression(ex)}
                  className="w-full p-3 text-left border rounded-md hover:bg-muted transition-colors font-mono"
                >
                  {ex}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {history.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Calculation History
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => useFromHistory(item)}
                  className="w-full p-3 text-left border rounded-md hover:bg-muted transition-colors"
                >
                  <div className="font-mono text-sm">
                    {item.expression} <span className="text-muted-foreground">=</span>{" "}
                    <span className="font-bold text-primary">{item.result}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            • Supports basic arithmetic: addition (+), subtraction (-), multiplication (*), division (/)
          </p>
          <p>
            • Modulo operator (%) returns the remainder of division
          </p>
          <p>
            • Use parentheses () to group operations and control order of evaluation
          </p>
          <p>
            • Follows standard order of operations (PEMDAS/BODMAS)
          </p>
          <p>
            • Decimal numbers are supported (e.g., 3.14, 2.5)
          </p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <strong className="text-blue-800 dark:text-blue-300">Security:</strong>{" "}
            All calculations are performed safely in your browser. Only basic math operators are allowed.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
