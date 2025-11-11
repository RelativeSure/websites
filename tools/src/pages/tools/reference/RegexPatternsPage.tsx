import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const patterns = [
  {
    name: "Email",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    description: "Basic email validation",
    example: "user@example.com",
    category: "Validation"
  },
  {
    name: "URL",
    pattern: "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$",
    description: "Match HTTP/HTTPS URLs",
    example: "https://example.com/path",
    category: "Validation"
  },
  {
    name: "IPv4 Address",
    pattern: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    description: "Match valid IPv4 addresses",
    example: "192.168.1.1",
    category: "Validation"
  },
  {
    name: "IPv6 Address",
    pattern: "^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::)$",
    description: "Match IPv6 addresses (simplified)",
    example: "2001:0db8:85a3::8a2e:0370:7334",
    category: "Validation"
  },
  {
    name: "Phone (US)",
    pattern: "^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$",
    description: "US phone number format",
    example: "(123) 456-7890",
    category: "Validation"
  },
  {
    name: "Hex Color",
    pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
    description: "Match hex color codes",
    example: "#FF5733 or #F57",
    category: "Validation"
  },
  {
    name: "Credit Card",
    pattern: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$",
    description: "Visa, MasterCard, Amex",
    example: "4532015112830366",
    category: "Validation"
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    description: "ISO date format",
    example: "2024-01-31",
    category: "Date/Time"
  },
  {
    name: "Time (24h)",
    pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
    description: "24-hour time format",
    example: "14:30",
    category: "Date/Time"
  },
  {
    name: "Username",
    pattern: "^[a-zA-Z0-9_-]{3,16}$",
    description: "Alphanumeric with underscore/hyphen, 3-16 chars",
    example: "user_name-123",
    category: "Validation"
  },
  {
    name: "Password (Strong)",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    description: "Min 8 chars, uppercase, lowercase, number, special char",
    example: "Pass123!",
    category: "Validation"
  },
  {
    name: "Digits Only",
    pattern: "^\\d+$",
    description: "Match one or more digits",
    example: "12345",
    category: "Common Patterns"
  },
  {
    name: "Letters Only",
    pattern: "^[a-zA-Z]+$",
    description: "Match alphabetic characters only",
    example: "Hello",
    category: "Common Patterns"
  },
  {
    name: "Alphanumeric",
    pattern: "^[a-zA-Z0-9]+$",
    description: "Letters and numbers only",
    example: "Test123",
    category: "Common Patterns"
  },
  {
    name: "Whitespace",
    pattern: "\\s+",
    description: "Match any whitespace",
    example: "spaces   and  tabs",
    category: "Common Patterns"
  },
  {
    name: "Trim Whitespace",
    pattern: "^\\s+|\\s+$",
    description: "Match leading/trailing whitespace",
    example: "  text  ",
    category: "Common Patterns"
  },
  {
    name: "HTML Tags",
    pattern: "<[^>]*>",
    description: "Match HTML/XML tags",
    example: "<div>content</div>",
    category: "Parsing"
  },
  {
    name: "Extract Domain",
    pattern: "@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
    description: "Extract domain from email",
    example: "user@example.com → example.com",
    category: "Extraction"
  },
  {
    name: "Camel Case Split",
    pattern: "([a-z])([A-Z])",
    description: "Split camelCase words",
    example: "camelCase → camel Case",
    category: "Text Processing"
  },
  {
    name: "UUID",
    pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
    description: "Match UUID v4",
    example: "550e8400-e29b-41d4-a716-446655440000",
    category: "Validation"
  },
  {
    name: "Slug",
    pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    description: "URL-friendly slug",
    example: "my-blog-post",
    category: "Validation"
  },
];

export default function RegexPatternsPage() {
  const [search, setSearch] = useState("");

  const filtered = patterns.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(patterns.map((p) => p.category)));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">RegEx Patterns Reference</h1>
        <p className="text-muted-foreground">
          Common regular expression patterns for validation and parsing
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find regex patterns by name or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patterns..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((p) => p.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((pattern, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="font-semibold text-primary">{pattern.name}</div>
                      <button
                        onClick={() => copyToClipboard(pattern.pattern)}
                        className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {pattern.description}
                    </div>
                    <div className="font-mono text-xs bg-muted p-2 rounded mb-2 overflow-x-auto">
                      {pattern.pattern}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Example: <span className="font-mono">{pattern.example}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No patterns found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
