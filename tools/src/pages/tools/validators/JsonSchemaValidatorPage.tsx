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
import { CheckCircle, AlertCircle, FileJson } from "lucide-react";

interface ValidationError {
  path: string;
  message: string;
  keyword: string;
}

export default function JsonSchemaValidatorPage() {
  const [jsonData, setJsonData] = useState("");
  const [schema, setSchema] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateJson = () => {
    setIsValid(null);
    setErrors([]);

    try {
      // Parse JSON data
      const data = JSON.parse(jsonData);
      const schemaObj = JSON.parse(schema);

      // Simple validation implementation
      const validationErrors = validateAgainstSchema(data, schemaObj, "$");

      if (validationErrors.length === 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
        setErrors(validationErrors);
      }
    } catch (err) {
      setIsValid(false);
      if (err instanceof Error) {
        setErrors([
          {
            path: "$",
            message: `Parse error: ${err.message}`,
            keyword: "parse",
          },
        ]);
      }
    }
  };

  const validateAgainstSchema = (
    data: any,
    schema: any,
    path: string
  ): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Type validation
    if (schema.type) {
      const actualType = Array.isArray(data)
        ? "array"
        : data === null
        ? "null"
        : typeof data;

      const expectedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];

      if (!expectedTypes.includes(actualType)) {
        errors.push({
          path,
          message: `Expected type ${expectedTypes.join(" or ")}, but got ${actualType}`,
          keyword: "type",
        });
        return errors; // Don't validate further if type is wrong
      }
    }

    // Required properties
    if (schema.required && typeof data === "object" && !Array.isArray(data)) {
      schema.required.forEach((prop: string) => {
        if (!(prop in data)) {
          errors.push({
            path,
            message: `Missing required property: ${prop}`,
            keyword: "required",
          });
        }
      });
    }

    // Properties validation
    if (schema.properties && typeof data === "object" && !Array.isArray(data)) {
      Object.keys(schema.properties).forEach((prop) => {
        if (prop in data) {
          const propErrors = validateAgainstSchema(
            data[prop],
            schema.properties[prop],
            `${path}.${prop}`
          );
          errors.push(...propErrors);
        }
      });
    }

    // String validations
    if (typeof data === "string") {
      if (schema.minLength !== undefined && data.length < schema.minLength) {
        errors.push({
          path,
          message: `String length ${data.length} is less than minimum ${schema.minLength}`,
          keyword: "minLength",
        });
      }
      if (schema.maxLength !== undefined && data.length > schema.maxLength) {
        errors.push({
          path,
          message: `String length ${data.length} exceeds maximum ${schema.maxLength}`,
          keyword: "maxLength",
        });
      }
      if (schema.pattern) {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(data)) {
          errors.push({
            path,
            message: `String does not match pattern: ${schema.pattern}`,
            keyword: "pattern",
          });
        }
      }
      if (schema.enum && !schema.enum.includes(data)) {
        errors.push({
          path,
          message: `Value must be one of: ${schema.enum.join(", ")}`,
          keyword: "enum",
        });
      }
    }

    // Number validations
    if (typeof data === "number") {
      if (schema.minimum !== undefined && data < schema.minimum) {
        errors.push({
          path,
          message: `Value ${data} is less than minimum ${schema.minimum}`,
          keyword: "minimum",
        });
      }
      if (schema.maximum !== undefined && data > schema.maximum) {
        errors.push({
          path,
          message: `Value ${data} exceeds maximum ${schema.maximum}`,
          keyword: "maximum",
        });
      }
      if (schema.multipleOf !== undefined && data % schema.multipleOf !== 0) {
        errors.push({
          path,
          message: `Value ${data} is not a multiple of ${schema.multipleOf}`,
          keyword: "multipleOf",
        });
      }
    }

    // Array validations
    if (Array.isArray(data)) {
      if (schema.minItems !== undefined && data.length < schema.minItems) {
        errors.push({
          path,
          message: `Array length ${data.length} is less than minimum ${schema.minItems}`,
          keyword: "minItems",
        });
      }
      if (schema.maxItems !== undefined && data.length > schema.maxItems) {
        errors.push({
          path,
          message: `Array length ${data.length} exceeds maximum ${schema.maxItems}`,
          keyword: "maxItems",
        });
      }
      if (schema.items) {
        data.forEach((item, index) => {
          const itemErrors = validateAgainstSchema(
            item,
            schema.items,
            `${path}[${index}]`
          );
          errors.push(...itemErrors);
        });
      }
    }

    return errors;
  };

  const exampleSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "required": ["name", "email"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "pattern": "^[^@]+@[^@]+\\\\.[^@]+$"
    },
    "age": {
      "type": "number",
      "minimum": 0,
      "maximum": 150
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 0,
      "maxItems": 10
    }
  }
}`;

  const exampleData = `{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "tags": ["developer", "javascript"]
}`;

  const loadExample = () => {
    setSchema(exampleSchema);
    setJsonData(exampleData);
    setIsValid(null);
    setErrors([]);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON Schema Validator</h1>
        <p className="text-muted-foreground">
          Validate JSON data against a JSON Schema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Schema</CardTitle>
            <CardDescription>
              Enter your JSON Schema definition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder='{"type": "object", "properties": {...}}'
              className="font-mono text-sm min-h-[400px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSON Data</CardTitle>
            <CardDescription>
              Enter the JSON data to validate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder='{"name": "John", "email": "john@example.com"}'
              className="font-mono text-sm min-h-[400px]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 mb-6">
        <Button onClick={validateJson} size="lg" className="flex-1 lg:flex-none">
          <CheckCircle className="h-4 w-4 mr-2" />
          Validate
        </Button>
        <Button onClick={loadExample} variant="outline" size="lg">
          Load Example
        </Button>
      </div>

      {isValid !== null && (
        <Card className={isValid ? "border-green-600" : "border-destructive"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isValid ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">Valid</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span className="text-destructive">Invalid</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isValid
                ? "The JSON data is valid according to the schema"
                : `Found ${errors.length} validation error${errors.length !== 1 ? "s" : ""}`}
            </CardDescription>
          </CardHeader>
          {!isValid && errors.length > 0 && (
            <CardContent>
              <div className="space-y-3">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    className="border border-destructive/20 rounded p-3 bg-destructive/5"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{error.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Path: <code className="bg-muted px-1 py-0.5 rounded">{error.path}</code>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Keyword: <span className="font-mono">{error.keyword}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About JSON Schema</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            JSON Schema is a vocabulary that allows you to annotate and validate JSON
            documents. It provides a way to describe the structure, constraints, and
            data types of JSON data.
          </p>
          <div>
            <strong>Supported validations:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>Type validation:</strong> string, number, boolean, object, array, null
              </li>
              <li>
                <strong>String:</strong> minLength, maxLength, pattern, enum
              </li>
              <li>
                <strong>Number:</strong> minimum, maximum, multipleOf
              </li>
              <li>
                <strong>Array:</strong> minItems, maxItems, items validation
              </li>
              <li>
                <strong>Object:</strong> required properties, properties validation
              </li>
            </ul>
          </div>
          <p>
            <strong>Note:</strong> This is a simplified validator covering common use cases.
            For full JSON Schema Draft 7 support with advanced features (oneOf, anyOf,
            allOf, $ref, etc.), use a complete library like Ajv.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
