import { useState } from "react";
import { RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RandomDataGenerator() {
  const [type, setType] = useState<string>("number");
  const [count, setCount] = useState(10);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateNumber = () => Math.floor(Math.random() * 1000000);
  const generateEmail = () => {
    const names = ["john", "jane", "alex", "sarah", "mike", "emma", "david", "lisa"];
    const domains = ["example.com", "test.com", "sample.org", "demo.net"];
    return `${names[Math.floor(Math.random() * names.length)]}${generateNumber()}@${domains[Math.floor(Math.random() * domains.length)]}`;
  };

  const generateName = () => {
    const first = ["John", "Jane", "Alex", "Sarah", "Mike", "Emma", "David", "Lisa", "Tom", "Anna"];
    const last = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"];
    return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
  };

  const generatePhone = () => {
    return `+1 (${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  };

  const generateAddress = () => {
    const streets = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd"];
    return `${Math.floor(Math.random() * 9000 + 1000)} ${streets[Math.floor(Math.random() * streets.length)]}`;
  };

  const generateIP = () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  };

  const generateMAC = () => {
    const hex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    return `${hex()}:${hex()}:${hex()}:${hex()}:${hex()}:${hex()}`.toUpperCase();
  };

  const generateDate = () => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split("T")[0];
  };

  const generate = () => {
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      switch (type) {
        case "number":
          results.push(generateNumber().toString());
          break;
        case "email":
          results.push(generateEmail());
          break;
        case "name":
          results.push(generateName());
          break;
        case "phone":
          results.push(generatePhone());
          break;
        case "address":
          results.push(generateAddress());
          break;
        case "ip":
          results.push(generateIP());
          break;
        case "mac":
          results.push(generateMAC());
          break;
        case "date":
          results.push(generateDate());
          break;
      }
    }

    setOutput(results.join("\n"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Random Data Generator</h1>
        <p className="text-muted-foreground">
          Generate random test data for development
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Random Data</CardTitle>
          <CardDescription>Configure and generate test data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Data Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="number">Random Numbers</SelectItem>
                  <SelectItem value="email">Email Addresses</SelectItem>
                  <SelectItem value="name">Full Names</SelectItem>
                  <SelectItem value="phone">Phone Numbers</SelectItem>
                  <SelectItem value="address">Street Addresses</SelectItem>
                  <SelectItem value="ip">IP Addresses</SelectItem>
                  <SelectItem value="mac">MAC Addresses</SelectItem>
                  <SelectItem value="date">Dates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Count</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="font-mono"
              />
            </div>
          </div>

          <Button onClick={generate} className="w-full">
            <RefreshCw className="mr-2 w-4 h-4" />
            Generate Data
          </Button>

          {output && (
            <>
              <div className="space-y-2">
                <Label htmlFor="output">Generated Data</Label>
                <textarea
                  id="output"
                  value={output}
                  readOnly
                  className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                />
              </div>

              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="w-full"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-4 h-4" />
                    Copy Data
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
