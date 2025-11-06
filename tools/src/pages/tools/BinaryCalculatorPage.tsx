import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Binary, AlertCircle } from "lucide-react";

export default function BinaryCalculatorPage() {
  const [num1, setNum1] = useState("1010");
  const [num2, setNum2] = useState("0110");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const validateBinary = (binary: string): boolean => {
    return /^[01]+$/.test(binary.trim());
  };

  const calculate = () => {
    setError("");

    const trimmed1 = num1.trim();
    const trimmed2 = num2.trim();

    if (!trimmed1 || !trimmed2) {
      setError("Please enter both numbers");
      return;
    }

    if (!validateBinary(trimmed1) || !validateBinary(trimmed2)) {
      setError("Please enter valid binary numbers (only 0 and 1)");
      return;
    }

    try {
      const decimal1 = parseInt(trimmed1, 2);
      const decimal2 = parseInt(trimmed2, 2);
      let decimalResult: number;

      switch (operation) {
        case "+":
          decimalResult = decimal1 + decimal2;
          break;
        case "-":
          decimalResult = decimal1 - decimal2;
          break;
        case "*":
          decimalResult = decimal1 * decimal2;
          break;
        case "/":
          if (decimal2 === 0) {
            setError("Cannot divide by zero");
            return;
          }
          decimalResult = Math.floor(decimal1 / decimal2);
          break;
        case "%":
          if (decimal2 === 0) {
            setError("Cannot modulo by zero");
            return;
          }
          decimalResult = decimal1 % decimal2;
          break;
        case "&":
          decimalResult = decimal1 & decimal2;
          break;
        case "|":
          decimalResult = decimal1 | decimal2;
          break;
        case "^":
          decimalResult = decimal1 ^ decimal2;
          break;
        case "<<":
          decimalResult = decimal1 << decimal2;
          break;
        case ">>":
          decimalResult = decimal1 >> decimal2;
          break;
        default:
          setError("Invalid operation");
          return;
      }

      // Handle negative results
      if (decimalResult < 0) {
        setResult(`${decimalResult.toString(2)} (${decimalResult} in decimal)`);
      } else {
        setResult(decimalResult.toString(2));
      }
    } catch (err) {
      setError("An error occurred during calculation");
    }
  };

  const operations = [
    { value: "+", label: "Addition (+)" },
    { value: "-", label: "Subtraction (-)" },
    { value: "*", label: "Multiplication (×)" },
    { value: "/", label: "Division (÷)" },
    { value: "%", label: "Modulo (%)" },
    { value: "&", label: "AND (&)" },
    { value: "|", label: "OR (|)" },
    { value: "^", label: "XOR (^)" },
    { value: "<<", label: "Left Shift (<<)" },
    { value: ">>", label: "Right Shift (>>)" },
  ];

  const examples = [
    { num1: "1010", num2: "0110", op: "+", desc: "10 + 6 = 16" },
    { num1: "1111", num2: "0011", op: "&", desc: "AND operation" },
    { num1: "1010", num2: "0101", op: "|", desc: "OR operation" },
    { num1: "1010", num2: "0101", op: "^", desc: "XOR operation" },
    { num1: "0011", num2: "10", op: "<<", desc: "Left shift" },
  ];

  const loadExample = (example: typeof examples[0]) => {
    setNum1(example.num1);
    setNum2(example.num2);
    setOperation(example.op);
  };

  const toDecimal = (binary: string): number => {
    if (!validateBinary(binary.trim())) return 0;
    return parseInt(binary.trim(), 2);
  };

  const toBinary = (decimal: string): string => {
    const num = parseInt(decimal);
    if (isNaN(num)) return "";
    if (num < 0) return num.toString(2);
    return num.toString(2);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Binary Calculator</h1>
        <p className="text-muted-foreground">
          Perform arithmetic and bitwise operations on binary numbers
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Binary className="h-5 w-5" />
            Binary Calculation
          </CardTitle>
          <CardDescription>
            Enter binary numbers (0 and 1 only) and select an operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num1">First Number (Binary)</Label>
              <Input
                id="num1"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="1010"
                className="font-mono text-lg"
              />
              {validateBinary(num1) && (
                <div className="text-xs text-muted-foreground">
                  Decimal: {toDecimal(num1)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="num2">Second Number (Binary)</Label>
              <Input
                id="num2"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="0110"
                className="font-mono text-lg"
              />
              {validateBinary(num2) && (
                <div className="text-xs text-muted-foreground">
                  Decimal: {toDecimal(num2)}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operation">Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger id="operation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {operations.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculate} className="w-full" size="lg">
            <Binary className="h-4 w-4 mr-2" />
            Calculate
          </Button>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {result && !error && (
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold font-mono">{result}</div>
                  {validateBinary(result.split(" ")[0]) && (
                    <div className="text-muted-foreground">
                      Decimal: {toDecimal(result.split(" ")[0])}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Examples</CardTitle>
          <CardDescription>
            Click to load an example calculation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {examples.map((ex, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => loadExample(ex)}
                className="justify-start"
              >
                <div className="text-left">
                  <div className="font-mono text-xs">
                    {ex.num1} {ex.op} {ex.num2}
                  </div>
                  <div className="text-xs text-muted-foreground">{ex.desc}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Decimal to Binary Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dec-input">Decimal Number</Label>
              <Input
                id="dec-input"
                type="number"
                placeholder="42"
                onChange={(e) => {
                  const binary = toBinary(e.target.value);
                  const output = document.getElementById("dec-output") as HTMLInputElement;
                  if (output) output.value = binary;
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dec-output">Binary Result</Label>
              <Input
                id="dec-output"
                readOnly
                placeholder="Result..."
                className="font-mono bg-muted"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Binary to Decimal Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bin-input">Binary Number</Label>
              <Input
                id="bin-input"
                placeholder="101010"
                className="font-mono"
                onChange={(e) => {
                  const decimal = toDecimal(e.target.value);
                  const output = document.getElementById("bin-output") as HTMLInputElement;
                  if (output) output.value = decimal > 0 ? decimal.toString() : "";
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bin-output">Decimal Result</Label>
              <Input
                id="bin-output"
                readOnly
                placeholder="Result..."
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operations Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <strong>Arithmetic Operations:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>Addition (+):</strong> Add two binary numbers
              </li>
              <li>
                <strong>Subtraction (-):</strong> Subtract second from first
              </li>
              <li>
                <strong>Multiplication (×):</strong> Multiply two binary numbers
              </li>
              <li>
                <strong>Division (÷):</strong> Integer division (floor)
              </li>
              <li>
                <strong>Modulo (%):</strong> Remainder after division
              </li>
            </ul>
          </div>
          <div>
            <strong>Bitwise Operations:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>AND (&):</strong> Result bit is 1 only if both bits are 1
              </li>
              <li>
                <strong>OR (|):</strong> Result bit is 1 if either bit is 1
              </li>
              <li>
                <strong>XOR (^):</strong> Result bit is 1 if bits are different
              </li>
              <li>
                <strong>Left Shift (&lt;&lt;):</strong> Shift bits left (multiply by 2^n)
              </li>
              <li>
                <strong>Right Shift (&gt;&gt;):</strong> Shift bits right (divide by 2^n)
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            <strong>Note:</strong> All operations are performed on unsigned integers.
            Negative results are shown in two's complement notation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
