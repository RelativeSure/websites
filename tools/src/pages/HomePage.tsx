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
  Globe,
  Percent,
  KeySquare,
  Calendar,
  Tag,
  Scale,
  FileImage,
  Maximize2,
  Bot,
  Award,
  BarChart3,
  Hexagon,
  Server,
  Share2,
  Package,
  Map,
  ArrowRightLeft,
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
  { title: "JSON ⟷ YAML", icon: ArrowLeftRight, href: "/converters/json-yaml", category: "Converters" },
  { title: "XML ⟷ JSON", icon: FileCode, href: "/converters/xml-json", category: "Converters" },
  { title: "CSV ⟷ JSON", icon: Database, href: "/converters/csv-json", category: "Converters" },
  { title: "Timestamp", icon: Clock, href: "/converters/timestamp", category: "Converters" },
  { title: "Color", icon: Palette, href: "/converters/color-converter", category: "Converters" },
  { title: "Number Base", icon: Calculator, href: "/converters/number-base", category: "Converters" },
  { title: "Base Conv", icon: Binary, href: "/converters/base-conversion", category: "Converters" },
  { title: "Base64 Img", icon: Image, href: "/converters/base64-image", category: "Converters" },
  { title: "Unit Convert", icon: Ruler, href: "/converters/unit-converter", category: "Converters" },
  { title: "JSON → CSV", icon: Download, href: "/converters/json-to-csv", category: "Converters" },
  { title: "CSS Units", icon: MonitorSmartphone, href: "/converters/css-unit", category: "Converters" },
  { title: "CSV → JSON", icon: ArrowLeftRight, href: "/converters/csv-to-json", category: "Converters" },
  { title: "Timezone", icon: Globe, href: "/converters/timezone-converter", category: "Converters" },
  { title: "MD → HTML", icon: FileCode, href: "/converters/markdown-to-html", category: "Converters" },
  { title: "XML → YAML", icon: ArrowRightLeft, href: "/converters/xml-to-yaml", category: "Converters" },
  { title: "SQL → JSON", icon: Database, href: "/converters/sql-to-json", category: "Converters" },
  { title: "URL Encode", icon: Link2, href: "/encoders/url-encode", category: "Encoders" },
  { title: "HTML Entity", icon: Code2, href: "/encoders/html-entity", category: "Encoders" },
  { title: "Backslash Escape", icon: Slash, href: "/encoders/backslash-escape", category: "Encoders" },
  { title: "Morse Code", icon: Radio, href: "/encoders/morse-code", category: "Encoders" },
  { title: "Cipher", icon: Shield, href: "/encoders/cipher", category: "Encoders" },
  { title: "String Escape", icon: Code2, href: "/encoders/string-escape", category: "Encoders" },
  { title: "Image → Base64", icon: Image, href: "/encoders/image-to-base64", category: "Encoders" },
  { title: "JWT Decoder", icon: KeyRound, href: "/decoders/jwt-decoder", category: "Decoders" },
  { title: "JSON Format", icon: Braces, href: "/formatters/json-formatter", category: "Formatters" },
  { title: "HTML Format", icon: FileCode2, href: "/formatters/html-formatter", category: "Formatters" },
  { title: "SQL Format", icon: Code, href: "/formatters/sql-formatter", category: "Formatters" },
  { title: "JSON Diff", icon: GitCompare, href: "/formatters/json-diff", category: "Formatters" },
  { title: "GraphQL", icon: Code2, href: "/formatters/graphql-formatter", category: "Formatters" },
  { title: "JSON Valid", icon: CheckCircle, href: "/validators/json-validator", category: "Validators" },
  { title: "YAML Valid", icon: CheckCircle, href: "/validators/yaml-validator", category: "Validators" },
  { title: "Validator", icon: ShieldCheck, href: "/validators/validator", category: "Validators" },
  { title: "JSON Schema", icon: CheckCircle, href: "/validators/json-schema-validator", category: "Validators" },
  { title: "Hash Gen", icon: Hash, href: "/crypto/hash", category: "Crypto" },
  { title: "JWT Gen", icon: KeyRound, href: "/crypto/jwt-generator", category: "Crypto" },
  { title: "HMAC Gen", icon: Key, href: "/crypto/hmac", category: "Crypto" },
  { title: "TOTP Gen", icon: ShieldAlert, href: "/crypto/totp", category: "Crypto" },
  { title: "Bcrypt Hash", icon: Lock, href: "/crypto/bcrypt", category: "Crypto" },
  { title: "JWT Verify", icon: ShieldCheck, href: "/crypto/jwt-verifier", category: "Crypto" },
  { title: "Cert Decoder", icon: Award, href: "/crypto/certificate-decoder", category: "Crypto" },
  { title: "AES Encrypt", icon: Lock, href: "/crypto/aes-encrypt", category: "Crypto" },
  { title: "UUID Gen", icon: Fingerprint, href: "/generators/uuid", category: "Generators" },
  { title: "Password", icon: Lock, href: "/generators/password-generator", category: "Generators" },
  { title: "Lorem Ipsum", icon: Type, href: "/generators/lorem-ipsum", category: "Generators" },
  { title: "Mock Data", icon: Users, href: "/generators/mock-data", category: "Generators" },
  { title: "Slug Gen", icon: Type, href: "/generators/slug-generator", category: "Generators" },
  { title: "Color Palette", icon: Palette, href: "/generators/color-palette", category: "Generators" },
  { title: "QR Code", icon: QrCode, href: "/generators/qr-code", category: "Generators" },
  { title: "QR Scanner", icon: ScanLine, href: "/generators/qr-scanner", category: "Generators" },
  { title: "Random Data", icon: Shuffle, href: "/generators/random-data", category: "Generators" },
  { title: "Data URI Gen", icon: FileType, href: "/generators/data-uri", category: "Generators" },
  { title: "Secrets Gen", icon: KeySquare, href: "/generators/secrets-generator", category: "Generators" },
  { title: "Meta Tags", icon: Tag, href: "/generators/meta-tag-generator", category: "Generators" },
  { title: "Open Graph", icon: Share2, href: "/generators/open-graph-preview", category: "Generators" },
  { title: "Manifest Gen", icon: FileCode2, href: "/generators/manifest-generator", category: "Generators" },
  { title: "Sitemap Gen", icon: Map, href: "/generators/sitemap-generator", category: "Generators" },
  { title: "Security.txt", icon: ShieldAlert, href: "/generators/security-txt", category: "Generators" },
  { title: "robots.txt", icon: Bot, href: "/generators/robots-txt", category: "Generators" },
  { title: ".htaccess", icon: Server, href: "/generators/htaccess-generator", category: "Generators" },
  { title: "Text Diff", icon: FileText, href: "/text-tools/diff", category: "Text Tools" },
  { title: "Case Convert", icon: Code2, href: "/text-tools/case-converter", category: "Text Tools" },
  { title: "Text Tools", icon: WrapText, href: "/text-tools/text-tools", category: "Text Tools" },
  { title: "ASCII Art", icon: Sparkles, href: "/text-tools/ascii-art", category: "Text Tools" },
  { title: "Regex Test", icon: TestTube, href: "/text-tools/regex-tester", category: "Text Tools" },
  { title: "Levenshtein", icon: Scale, href: "/text-tools/levenshtein", category: "Text Tools" },
  { title: "Text Stats", icon: BarChart3, href: "/text-tools/text-statistics", category: "Text Tools" },
  { title: "Text Analyze", icon: LineChart, href: "/text-analyzer", category: "Text Tools" },
  { title: "Markdown", icon: FileType, href: "/text-tools/markdown-preview", category: "Dev Tools" },
  { title: "Cron Parser", icon: Timer, href: "/dev-tools/cron-parser", category: "Dev Tools" },
  { title: "Cron Builder", icon: CalendarCog, href: "/dev-tools/cron-builder", category: "Dev Tools" },
  { title: "IP Subnet", icon: Network, href: "/dev-tools/ip-subnet", category: "Dev Tools" },
  { title: "Chmod Calc", icon: Terminal, href: "/dev-tools/chmod", category: "Dev Tools" },
  { title: "JSON → TS", icon: FileJson, href: "/converters/json-to-typescript", category: "Dev Tools" },
  { title: "CSS Minify", icon: Minimize2, href: "/formatters/css-minifier", category: "Dev Tools" },
  { title: "URL Parser", icon: LinkIcon, href: "/dev-tools/url-parser", category: "Dev Tools" },
  { title: "User Agent", icon: Smartphone, href: "/dev-tools/user-agent-parser", category: "Dev Tools" },
  { title: "JSON Path", icon: Search, href: "/dev-tools/json-path-tester", category: "Dev Tools" },
  { title: "JS Minifier", icon: Minimize2, href: "/dev-tools/js-minifier", category: "Dev Tools" },
  { title: "Package.json", icon: Package, href: "/dev-tools/package-json-analyzer", category: "Dev Tools" },
  { title: "Expr Eval", icon: Calculator, href: "/math/expression-evaluator", category: "Math" },
  { title: "Percentage", icon: Percent, href: "/math/percentage-calculator", category: "Math" },
  { title: "Date Calc", icon: Calendar, href: "/math/date-calculator", category: "Math" },
  { title: "Binary Calc", icon: Binary, href: "/math/binary-calculator", category: "Math" },
  { title: "Img Compress", icon: Image, href: "/media/image-compressor", category: "Media" },
  { title: "SVG Optimizer", icon: FileImage, href: "/media/svg-optimizer", category: "Media" },
  { title: "Img Resizer", icon: Maximize2, href: "/media/image-resizer", category: "Media" },
  { title: "Favicon Gen", icon: Hexagon, href: "/media/favicon-generator", category: "Media" },
  { title: "HTTP Status", icon: Info, href: "/reference/http-status", category: "Reference" },
  { title: "HTTP Headers", icon: Globe, href: "/reference/http-headers", category: "Reference" },
  { title: "HTTP Methods", icon: ArrowRightLeft, href: "/reference/http-methods", category: "Reference" },
  { title: "ASCII Table", icon: Type, href: "/reference/ascii-table", category: "Reference" },
  { title: "RegEx", icon: Search, href: "/reference/regex-patterns", category: "Reference" },
  { title: "HTML Entities", icon: Code2, href: "/reference/html-entities", category: "Reference" },
  { title: "Port Numbers", icon: Server, href: "/reference/port-numbers", category: "Reference" },
  { title: "MIME Types", icon: FileType, href: "/reference/mime-types", category: "Reference" },
  { title: "Git Commands", icon: GitCompare, href: "/reference/git-commands", category: "Reference" },
  { title: "CSS Props", icon: Palette, href: "/reference/css-properties", category: "Reference" },
  { title: "JWT Claims", icon: KeySquare, href: "/reference/jwt-claims", category: "Reference" },
  { title: "Color Names", icon: Palette, href: "/reference/color-names", category: "Reference" },
  { title: "Markdown", icon: FileText, href: "/reference/markdown-syntax", category: "Reference" },
  { title: "IP Ranges", icon: Network, href: "/reference/ip-address-ranges", category: "Reference" },
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
