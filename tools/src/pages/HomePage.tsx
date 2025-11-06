import { Link } from "@tanstack/react-router";
import { useState } from "react";
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
  CheckCircle,
  Database,
  FileCode,
  KeyRound,
  Palette,
  Calculator,
  Type,
  Lock,
  TestTube,
  FileCode2,
  Search,
  Image,
  Shuffle,
  Info,
  Smartphone,
  Slash,
  QrCode,
  FileType,
  Code,
  Timer,
  LineChart,
  FileJson,
  Minimize2,
  Link as LinkIcon,
  ScanLine,
  Users,
  WrapText,
  Radio,
  Shield,
  ShieldCheck,
  Key,
  Ruler,
  Sparkles,
  GitCompare,
  CalendarCog,
  Network,
  ShieldAlert,
  Download,
  Terminal,
  MonitorSmartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const tools = [
  { title: "JSON ⟷ YAML", icon: ArrowLeftRight, href: "/tools/json-yaml", category: "Converters" },
  { title: "XML ⟷ JSON", icon: FileCode, href: "/tools/xml-json", category: "Converters" },
  { title: "CSV ⟷ JSON", icon: Database, href: "/tools/csv-json", category: "Converters" },
  { title: "Timestamp", icon: Clock, href: "/tools/timestamp", category: "Converters" },
  { title: "Color", icon: Palette, href: "/tools/color-converter", category: "Converters" },
  { title: "Number Base", icon: Calculator, href: "/tools/number-base", category: "Converters" },
  { title: "Base Conv", icon: Binary, href: "/tools/base-conversion", category: "Converters" },
  { title: "Base64 Img", icon: Image, href: "/tools/base64-image", category: "Converters" },
  { title: "Unit Convert", icon: Ruler, href: "/tools/unit-converter", category: "Converters" },
  { title: "JSON → CSV", icon: Download, href: "/tools/json-to-csv", category: "Converters" },
  { title: "CSS Units", icon: MonitorSmartphone, href: "/tools/css-unit", category: "Converters" },
  { title: "URL Encode", icon: Link2, href: "/tools/url-encode", category: "Encoders" },
  { title: "HTML Entity", icon: Code2, href: "/tools/html-entity", category: "Encoders" },
  { title: "Backslash Escape", icon: Slash, href: "/tools/backslash-escape", category: "Encoders" },
  { title: "Morse Code", icon: Radio, href: "/tools/morse-code", category: "Encoders" },
  { title: "Cipher", icon: Shield, href: "/tools/cipher", category: "Encoders" },
  { title: "Image → Base64", icon: Image, href: "/tools/image-to-base64", category: "Encoders" },
  { title: "JWT Decoder", icon: KeyRound, href: "/tools/jwt-decoder", category: "Decoders" },
  { title: "JSON Format", icon: Braces, href: "/tools/json-formatter", category: "Formatters" },
  { title: "HTML Format", icon: FileCode2, href: "/tools/html-formatter", category: "Formatters" },
  { title: "SQL Format", icon: Code, href: "/tools/sql-formatter", category: "Formatters" },
  { title: "JSON Diff", icon: GitCompare, href: "/tools/json-diff", category: "Formatters" },
  { title: "JSON Valid", icon: CheckCircle, href: "/tools/json-validator", category: "Validators" },
  { title: "YAML Valid", icon: CheckCircle, href: "/tools/yaml-validator", category: "Validators" },
  { title: "Validator", icon: ShieldCheck, href: "/tools/validator", category: "Validators" },
  { title: "Hash Gen", icon: Hash, href: "/tools/hash", category: "Crypto" },
  { title: "JWT Gen", icon: KeyRound, href: "/tools/jwt-generator", category: "Crypto" },
  { title: "HMAC Gen", icon: Key, href: "/tools/hmac", category: "Crypto" },
  { title: "TOTP Gen", icon: ShieldAlert, href: "/tools/totp", category: "Crypto" },
  { title: "Bcrypt Hash", icon: Lock, href: "/tools/bcrypt", category: "Crypto" },
  { title: "JWT Verify", icon: ShieldCheck, href: "/tools/jwt-verifier", category: "Crypto" },
  { title: "UUID Gen", icon: Fingerprint, href: "/tools/uuid", category: "Generators" },
  { title: "Password", icon: Lock, href: "/tools/password-generator", category: "Generators" },
  { title: "Lorem Ipsum", icon: Type, href: "/tools/lorem-ipsum", category: "Generators" },
  { title: "Mock Data", icon: Users, href: "/tools/mock-data", category: "Generators" },
  { title: "Slug Gen", icon: Type, href: "/tools/slug-generator", category: "Generators" },
  { title: "Color Palette", icon: Palette, href: "/tools/color-palette", category: "Generators" },
  { title: "QR Code", icon: QrCode, href: "/tools/qr-code", category: "Generators" },
  { title: "QR Scanner", icon: ScanLine, href: "/tools/qr-scanner", category: "Generators" },
  { title: "Random Data", icon: Shuffle, href: "/tools/random-data", category: "Generators" },
  { title: "Data URI Gen", icon: FileType, href: "/tools/data-uri", category: "Generators" },
  { title: "Text Diff", icon: FileText, href: "/tools/diff", category: "Text Tools" },
  { title: "Case Convert", icon: Code2, href: "/tools/case-converter", category: "Text Tools" },
  { title: "Text Tools", icon: WrapText, href: "/tools/text-tools", category: "Text Tools" },
  { title: "ASCII Art", icon: Sparkles, href: "/tools/ascii-art", category: "Text Tools" },
  { title: "Regex Test", icon: TestTube, href: "/tools/regex-tester", category: "Text Tools" },
  { title: "Text Analyze", icon: LineChart, href: "/tools/text-analyzer", category: "Text Tools" },
  { title: "Markdown", icon: FileType, href: "/tools/markdown-preview", category: "Dev Tools" },
  { title: "Cron Parser", icon: Timer, href: "/tools/cron-parser", category: "Dev Tools" },
  { title: "Cron Builder", icon: CalendarCog, href: "/tools/cron-builder", category: "Dev Tools" },
  { title: "IP Subnet", icon: Network, href: "/tools/ip-subnet", category: "Dev Tools" },
  { title: "Chmod Calc", icon: Terminal, href: "/tools/chmod", category: "Dev Tools" },
  { title: "JSON → TS", icon: FileJson, href: "/tools/json-to-typescript", category: "Dev Tools" },
  { title: "CSS Minify", icon: Minimize2, href: "/tools/css-minifier", category: "Dev Tools" },
  { title: "URL Parser", icon: LinkIcon, href: "/tools/url-parser", category: "Dev Tools" },
  { title: "User Agent", icon: Smartphone, href: "/tools/user-agent-parser", category: "Dev Tools" },
  { title: "HTTP Status", icon: Info, href: "/tools/http-status", category: "Reference" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase()) ||
    tool.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] animate-pulse" />

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Compact Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl md:text-3xl font-bold animate-pulse">{'>'}</span>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  tools.rasmusj.dk
                </h1>
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary/20 text-primary text-xs md:text-sm font-bold rounded-full border border-primary/30 animate-pulse">
                  {tools.length}
                </span>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-9 bg-background/50 border-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
            <p className="text-xs md:text-sm text-foreground/60 mt-2 font-mono">
              <span className="text-secondary">$</span> 100% client-side • Zero tracking • Zero servers
            </p>
          </div>

          {/* Ultra-Compact Tools Grid */}
          {search ? (
            // Filtered view
            <div className="mb-8">
              <h2 className="text-sm font-bold mb-3 text-primary">
                {filteredTools.length} results
              </h2>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {filteredTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.href} to={tool.href}>
                      <Card
                        className="group relative overflow-hidden cursor-pointer border border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:scale-105 hover:-translate-y-1 animate-fade-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative z-10 p-2.5">
                          <div className="flex flex-col items-center gap-1.5 text-center">
                            <div className="p-1.5 rounded bg-primary/10 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                              <Icon className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                            </div>
                            <CardTitle className="text-[10px] leading-tight font-bold text-foreground/90 group-hover:text-primary transition-colors">
                              {tool.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            // Category view
            categories.map((category) => (
              <div key={category} className="mb-6">
                <h2 className="text-xs md:text-sm font-bold mb-2 flex items-center gap-2 text-primary">
                  <span className="text-secondary">[</span>
                  {category}
                  <span className="text-secondary">]</span>
                  <span className="text-[10px] text-muted-foreground">
                    {tools.filter((tool) => tool.category === category).length}
                  </span>
                </h2>
                <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {tools
                    .filter((tool) => tool.category === category)
                    .map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <Link key={tool.href} to={tool.href}>
                          <Card
                            className="group relative overflow-hidden cursor-pointer border border-primary/20 bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:scale-105 hover:-translate-y-1 animate-fade-in"
                            style={{ animationDelay: `${index * 30}ms` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader className="relative z-10 p-2.5">
                              <div className="flex flex-col items-center gap-1.5 text-center">
                                <div className="p-1.5 rounded bg-primary/10 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                                  <Icon className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                                </div>
                                <CardTitle className="text-[10px] leading-tight font-bold text-foreground/90 group-hover:text-primary transition-colors">
                                  {tool.title}
                                </CardTitle>
                              </div>
                            </CardHeader>
                          </Card>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
