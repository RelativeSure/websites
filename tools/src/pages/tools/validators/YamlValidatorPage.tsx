import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import yaml from "js-yaml";

export default function YamlValidator() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const validateYaml = (value: string) => {
    setInput(value);

    if (!value.trim()) {
      setIsValid(null);
      setError("");
      return;
    }

    try {
      yaml.load(value);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid YAML");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">YAML Validator</h1>
        <p className="text-muted-foreground">
          Validate YAML syntax and structure
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            YAML Input
            {isValid === true && (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            )}
            {isValid === false && (
              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </CardTitle>
          <CardDescription>
            {isValid === true && "Valid YAML"}
            {isValid === false && "Invalid YAML"}
            {isValid === null && "Enter YAML to validate"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="yaml">YAML Content</Label>
            <Textarea
              id="yaml"
              placeholder="Enter YAML here..."
              value={input}
              onChange={(e) => validateYaml(e.target.value)}
              className="font-mono min-h-[300px]"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm font-mono text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {isValid === true && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                ✓ YAML is valid
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
