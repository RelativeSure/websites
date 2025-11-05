import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  Binary,
  Link2,
  Hash,
  Clock,
  Fingerprint,
  Braces,
  FileText,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-3xl md:text-4xl font-bold">{'>'}</span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
                dev.tools
              </h1>
            </div>
            <p className="text-base md:text-lg text-foreground/70 max-w-2xl font-mono">
              <span className="text-secondary">$</span> cat tools.json | jq '.description'<br/>
              <span className="text-foreground/80">"Client-side developer utilities. Zero tracking. Zero servers."</span>
            </p>
          </div>

          {/* Tools Grid */}
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
                <span className="text-secondary">[</span>
                {category}
                <span className="text-secondary">]</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tools
                  .filter((tool) => tool.category === category)
                  .map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link key={tool.href} to={tool.href}>
                        <Card className="h-full group relative overflow-hidden cursor-pointer border border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:-translate-y-1">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CardHeader className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <CardTitle className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                {tool.title}
                              </CardTitle>
                            </div>
                            <CardDescription className="text-sm text-foreground/60 font-mono leading-relaxed">
                              {tool.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-primary/20">
            <p className="text-sm text-center text-foreground/50 font-mono">
              <span className="text-secondary">{'#'}</span> 100% client-side
              <span className="text-primary mx-2">|</span>
              <span className="text-secondary">{'#'}</span> No data collection
              <span className="text-primary mx-2">|</span>
              <span className="text-secondary">{'#'}</span> Open source
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
