import {
  ArrowLeftRight,
  Binary,
  Braces,
  Clock,
  Code,
  Code2,
  FileJson,
  FileText,
  Fingerprint,
  Hash,
  Link2,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tools = [
  {
    title: "JSON ⟷ YAML",
    description: "Convert between JSON and YAML formats with syntax validation",
    icon: ArrowLeftRight,
    href: "/tools/json-yaml",
    category: "Converters",
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    icon: Binary,
    href: "/tools/base64",
    category: "Encoders",
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode and decode URL parameters and query strings",
    icon: Link2,
    href: "/tools/url-encode",
    category: "Encoders",
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes",
    icon: Hash,
    href: "/tools/hash",
    category: "Crypto",
  },
  {
    title: "UUID Generator",
    description: "Generate UUIDs (v1, v4) and GUIDs",
    icon: Fingerprint,
    href: "/tools/uuid",
    category: "Generators",
  },
  {
    title: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates",
    icon: Clock,
    href: "/tools/timestamp",
    category: "Converters",
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "Formatters",
  },
  {
    title: "Text Diff Checker",
    description: "Compare two text blocks and see the differences",
    icon: FileText,
    href: "/tools/diff",
    category: "Text Tools",
  },
  {
    title: "Case Converter",
    description: "Convert between camelCase, snake_case, kebab-case, and more",
    icon: Code2,
    href: "/tools/case-converter",
    category: "Text Tools",
  },
];

export default function HomePage() {
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Developer Tools</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of tools for developers. Convert, encode, hash, and format your data with ease.
            </p>
          </div>

          {/* Tools Grid */}
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-1 w-8 bg-primary rounded" />
                {category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link key={tool.href} href={tool.href}>
                        <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{tool.title}</CardTitle>
                              </div>
                            </div>
                            <CardDescription className="mt-3">{tool.description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>All tools run locally in your browser. Your data never leaves your device.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
