import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
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
  Home,
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
  QrCode,
  Eye,
  FileJson2,
  CalendarClock,
  Paintbrush,
  LinkIcon,
  AlignLeft,
  Image,
  Shuffle,
  Info,
  Smartphone,
  Slash,
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
  FileType,
  ShieldAlert,
  Download,
  Terminal,
  MonitorSmartphone,
  Globe,
  Percent,
  KeySquare,
  Search,
  Calendar,
  Tag,
  Scale,
  FileImage,
  Maximize2,
  Bot,
  Award,
  Minimize2,
  BarChart3,
  Hexagon,
  Share2,
  Package,
  FileCode2,
  Map,
  Server,
  ArrowRightLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const tools = [
  {
    title: "JSON ⟷ YAML",
    icon: ArrowLeftRight,
    href: "/converters/json-yaml",
    category: "Converters",
  },
  {
    title: "XML ⟷ JSON",
    icon: FileCode,
    href: "/converters/xml-json",
    category: "Converters",
  },
  {
    title: "CSV ⟷ JSON",
    icon: Database,
    href: "/converters/csv-json",
    category: "Converters",
  },
  {
    title: "Timestamp",
    icon: Clock,
    href: "/converters/timestamp",
    category: "Converters",
  },
  {
    title: "Color Converter",
    icon: Palette,
    href: "/converters/color-converter",
    category: "Converters",
  },
  {
    title: "Number Base",
    icon: Calculator,
    href: "/converters/number-base",
    category: "Converters",
  },
  {
    title: "Base Conversion",
    icon: Binary,
    href: "/converters/base-conversion",
    category: "Converters",
  },
  {
    title: "Base64 Image",
    icon: Image,
    href: "/converters/base64-image",
    category: "Converters",
  },
  {
    title: "Unit Converter",
    icon: Ruler,
    href: "/converters/unit-converter",
    category: "Converters",
  },
  {
    title: "JSON → TypeScript",
    icon: FileJson2,
    href: "/converters/json-to-typescript",
    category: "Converters",
  },
  {
    title: "JSON → CSV",
    icon: Download,
    href: "/converters/json-to-csv",
    category: "Converters",
  },
  {
    title: "CSS Unit Converter",
    icon: MonitorSmartphone,
    href: "/converters/css-unit",
    category: "Converters",
  },
  {
    title: "CSV → JSON",
    icon: ArrowLeftRight,
    href: "/converters/csv-to-json",
    category: "Converters",
  },
  {
    title: "Timezone Converter",
    icon: Globe,
    href: "/converters/timezone-converter",
    category: "Converters",
  },
  {
    title: "Markdown → HTML",
    icon: FileCode,
    href: "/converters/markdown-to-html",
    category: "Converters",
  },
  {
    title: "XML → YAML",
    icon: ArrowRightLeft,
    href: "/converters/xml-to-yaml",
    category: "Converters",
  },
  {
    title: "SQL → JSON",
    icon: Database,
    href: "/converters/sql-to-json",
    category: "Converters",
  },
  {
    title: "URL Encode",
    icon: Link2,
    href: "/encoders/url-encode",
    category: "Encoders",
  },
  {
    title: "HTML Entity",
    icon: Code2,
    href: "/encoders/html-entity",
    category: "Encoders",
  },
  {
    title: "Backslash Escape",
    icon: Slash,
    href: "/encoders/backslash-escape",
    category: "Encoders",
  },
  {
    title: "Morse Code",
    icon: Radio,
    href: "/encoders/morse-code",
    category: "Encoders",
  },
  {
    title: "Cipher (ROT13/Caesar)",
    icon: Shield,
    href: "/encoders/cipher",
    category: "Encoders",
  },
  {
    title: "String Escape/Unescape",
    icon: Code2,
    href: "/encoders/string-escape",
    category: "Encoders",
  },
  {
    title: "Image → Base64",
    icon: Image,
    href: "/encoders/image-to-base64",
    category: "Encoders",
  },
  {
    title: "JWT Decoder",
    icon: KeyRound,
    href: "/decoders/jwt-decoder",
    category: "Decoders",
  },
  {
    title: "JSON Formatter",
    icon: Braces,
    href: "/formatters/json-formatter",
    category: "Formatters",
  },
  {
    title: "HTML Formatter",
    icon: FileCode2,
    href: "/formatters/html-formatter",
    category: "Formatters",
  },
  {
    title: "SQL Formatter",
    icon: Database,
    href: "/formatters/sql-formatter",
    category: "Formatters",
  },
  {
    title: "CSS Minifier",
    icon: Paintbrush,
    href: "/formatters/css-minifier",
    category: "Formatters",
  },
  {
    title: "JSON Diff",
    icon: GitCompare,
    href: "/formatters/json-diff",
    category: "Formatters",
  },
  {
    title: "GraphQL Formatter",
    icon: Code2,
    href: "/formatters/graphql-formatter",
    category: "Formatters",
  },
  {
    title: "JSON Validator",
    icon: CheckCircle,
    href: "/validators/json-validator",
    category: "Validators",
  },
  {
    title: "YAML Validator",
    icon: CheckCircle,
    href: "/validators/yaml-validator",
    category: "Validators",
  },
  {
    title: "Email/IP/Domain Validator",
    icon: ShieldCheck,
    href: "/validators/validator",
    category: "Validators",
  },
  {
    title: "JSON Schema Validator",
    icon: CheckCircle,
    href: "/validators/json-schema-validator",
    category: "Validators",
  },
  {
    title: "Hash Generator",
    icon: Hash,
    href: "/crypto/hash",
    category: "Crypto",
  },
  {
    title: "JWT Generator",
    icon: KeyRound,
    href: "/crypto/jwt-generator",
    category: "Crypto",
  },
  {
    title: "HMAC Generator",
    icon: Key,
    href: "/crypto/hmac",
    category: "Crypto",
  },
  {
    title: "TOTP Generator",
    icon: ShieldAlert,
    href: "/crypto/totp",
    category: "Crypto",
  },
  {
    title: "Bcrypt Hash Generator",
    icon: Lock,
    href: "/crypto/bcrypt",
    category: "Crypto",
  },
  {
    title: "JWT Verifier",
    icon: ShieldCheck,
    href: "/crypto/jwt-verifier",
    category: "Crypto",
  },
  {
    title: "Certificate Decoder",
    icon: Award,
    href: "/crypto/certificate-decoder",
    category: "Crypto",
  },
  {
    title: "AES Encrypt/Decrypt",
    icon: Lock,
    href: "/crypto/aes-encrypt",
    category: "Crypto",
  },
  {
    title: "UUID Generator",
    icon: Fingerprint,
    href: "/generators/uuid",
    category: "Generators",
  },
  {
    title: "Password Generator",
    icon: Lock,
    href: "/generators/password-generator",
    category: "Generators",
  },
  {
    title: "Lorem Ipsum",
    icon: Type,
    href: "/generators/lorem-ipsum",
    category: "Generators",
  },
  {
    title: "Mock Data",
    icon: Users,
    href: "/generators/mock-data",
    category: "Generators",
  },
  {
    title: "Slug Generator",
    icon: Type,
    href: "/generators/slug-generator",
    category: "Generators",
  },
  {
    title: "Color Palette",
    icon: Palette,
    href: "/generators/color-palette",
    category: "Generators",
  },
  {
    title: "QR Code",
    icon: QrCode,
    href: "/generators/qr-code",
    category: "Generators",
  },
  {
    title: "QR Scanner",
    icon: ScanLine,
    href: "/generators/qr-scanner",
    category: "Generators",
  },
  {
    title: "Random Data",
    icon: Shuffle,
    href: "/generators/random-data",
    category: "Generators",
  },
  {
    title: "Data URI Generator",
    icon: FileType,
    href: "/generators/data-uri",
    category: "Generators",
  },
  {
    title: "Secrets Generator",
    icon: KeySquare,
    href: "/generators/secrets-generator",
    category: "Generators",
  },
  {
    title: "Meta Tag Generator",
    icon: Tag,
    href: "/generators/meta-tag-generator",
    category: "Generators",
  },
  {
    title: "Open Graph Preview",
    icon: Share2,
    href: "/generators/open-graph-preview",
    category: "Generators",
  },
  {
    title: "Manifest Generator",
    icon: FileCode2,
    href: "/generators/manifest-generator",
    category: "Generators",
  },
  {
    title: "Sitemap Generator",
    icon: Map,
    href: "/generators/sitemap-generator",
    category: "Generators",
  },
  {
    title: "Security.txt Generator",
    icon: ShieldAlert,
    href: "/generators/security-txt",
    category: "Generators",
  },
  {
    title: "robots.txt Generator",
    icon: Bot,
    href: "/generators/robots-txt",
    category: "Generators",
  },
  {
    title: ".htaccess Generator",
    icon: Server,
    href: "/generators/htaccess-generator",
    category: "Generators",
  },
  {
    title: "Text Diff",
    icon: FileText,
    href: "/text-tools/diff",
    category: "Text Tools",
  },
  {
    title: "Text Analyzer",
    icon: AlignLeft,
    href: "/text-tools/string-counter",
    category: "Text Tools",
  },
  {
    title: "Text Tools",
    icon: WrapText,
    href: "/text-tools/text-tools",
    category: "Text Tools",
  },
  {
    title: "ASCII Art",
    icon: Sparkles,
    href: "/text-tools/ascii-art",
    category: "Text Tools",
  },
  {
    title: "Markdown Preview",
    icon: Eye,
    href: "/text-tools/markdown-preview",
    category: "Text Tools",
  },
  {
    title: "Case Converter",
    icon: Code2,
    href: "/text-tools/case-converter",
    category: "Text Tools",
  },
  {
    title: "Regex Tester",
    icon: TestTube,
    href: "/text-tools/regex-tester",
    category: "Text Tools",
  },
  {
    title: "Levenshtein Distance",
    icon: Scale,
    href: "/text-tools/levenshtein",
    category: "Text Tools",
  },
  {
    title: "Text Statistics",
    icon: BarChart3,
    href: "/text-tools/text-statistics",
    category: "Text Tools",
  },
  {
    title: "Cron Parser",
    icon: CalendarClock,
    href: "/dev-tools/cron-parser",
    category: "Dev Tools",
  },
  {
    title: "Cron Builder",
    icon: CalendarCog,
    href: "/dev-tools/cron-builder",
    category: "Dev Tools",
  },
  {
    title: "IP Subnet Calculator",
    icon: Network,
    href: "/dev-tools/ip-subnet",
    category: "Dev Tools",
  },
  {
    title: "Unix Chmod Calculator",
    icon: Terminal,
    href: "/dev-tools/chmod",
    category: "Dev Tools",
  },
  {
    title: "URL Parser",
    icon: LinkIcon,
    href: "/dev-tools/url-parser",
    category: "Dev Tools",
  },
  {
    title: "User Agent Parser",
    icon: Smartphone,
    href: "/dev-tools/user-agent-parser",
    category: "Dev Tools",
  },
  {
    title: "JSON Path Tester",
    icon: Search,
    href: "/dev-tools/json-path-tester",
    category: "Dev Tools",
  },
  {
    title: "JavaScript Minifier",
    icon: Minimize2,
    href: "/dev-tools/js-minifier",
    category: "Dev Tools",
  },
  {
    title: "Package.json Analyzer",
    icon: Package,
    href: "/dev-tools/package-json-analyzer",
    category: "Dev Tools",
  },
  {
    title: "Expression Evaluator",
    icon: Calculator,
    href: "/math/expression-evaluator",
    category: "Math",
  },
  {
    title: "Percentage Calculator",
    icon: Percent,
    href: "/math/percentage-calculator",
    category: "Math",
  },
  {
    title: "Date Calculator",
    icon: Calendar,
    href: "/math/date-calculator",
    category: "Math",
  },
  {
    title: "Binary Calculator",
    icon: Binary,
    href: "/math/binary-calculator",
    category: "Math",
  },
  {
    title: "Image Compressor",
    icon: Image,
    href: "/media/image-compressor",
    category: "Media",
  },
  {
    title: "SVG Optimizer",
    icon: FileImage,
    href: "/media/svg-optimizer",
    category: "Media",
  },
  {
    title: "Image Resizer",
    icon: Maximize2,
    href: "/media/image-resizer",
    category: "Media",
  },
  {
    title: "Favicon Generator",
    icon: Hexagon,
    href: "/media/favicon-generator",
    category: "Media",
  },
  {
    title: "HTTP Status Codes",
    icon: Info,
    href: "/reference/http-status",
    category: "Reference",
  },
  {
    title: "HTTP Headers",
    icon: Globe,
    href: "/reference/http-headers",
    category: "Reference",
  },
  {
    title: "HTTP Methods",
    icon: ArrowRightLeft,
    href: "/reference/http-methods",
    category: "Reference",
  },
  {
    title: "ASCII & Unicode Table",
    icon: Type,
    href: "/reference/ascii-table",
    category: "Reference",
  },
  {
    title: "RegEx Patterns",
    icon: Search,
    href: "/reference/regex-patterns",
    category: "Reference",
  },
  {
    title: "HTML Entities",
    icon: Code2,
    href: "/reference/html-entities",
    category: "Reference",
  },
  {
    title: "Port Numbers",
    icon: Server,
    href: "/reference/port-numbers",
    category: "Reference",
  },
  {
    title: "MIME Types",
    icon: FileType,
    href: "/reference/mime-types",
    category: "Reference",
  },
  {
    title: "Git Commands",
    icon: GitCompare,
    href: "/reference/git-commands",
    category: "Reference",
  },
  {
    title: "CSS Properties",
    icon: Paintbrush,
    href: "/reference/css-properties",
    category: "Reference",
  },
  {
    title: "JWT Claims",
    icon: KeySquare,
    href: "/reference/jwt-claims",
    category: "Reference",
  },
  {
    title: "Color Names",
    icon: Palette,
    href: "/reference/color-names",
    category: "Reference",
  },
  {
    title: "Markdown Syntax",
    icon: FileText,
    href: "/reference/markdown-syntax",
    category: "Reference",
  },
  {
    title: "IP Address Ranges",
    icon: Network,
    href: "/reference/ip-address-ranges",
    category: "Reference",
  },
];

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  const categories = Array.from(new Set(tools.map((t) => t.category)));
  const sidebarContentRef = React.useRef<HTMLDivElement>(null);
  const scrollPositionRef = React.useRef<number>(0);

  // Save scroll position before navigation
  React.useEffect(() => {
    const contentEl = sidebarContentRef.current;
    if (!contentEl) return;

    const handleScroll = () => {
      scrollPositionRef.current = contentEl.scrollTop;
    };

    contentEl.addEventListener('scroll', handleScroll);
    return () => contentEl.removeEventListener('scroll', handleScroll);
  }, []);

  // Restore scroll position after navigation
  React.useEffect(() => {
    const contentEl = sidebarContentRef.current;
    if (contentEl && scrollPositionRef.current > 0) {
      contentEl.scrollTop = scrollPositionRef.current;
    }
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="border-b">
          <Link to="/" className="flex items-center gap-2 px-2 py-2 hover:bg-sidebar-accent rounded-md transition-colors">
            <Home className="w-5 h-5" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Developer Tools</span>
              <span className="text-xs text-muted-foreground">Back to home</span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent ref={sidebarContentRef}>
          {categories.map((category) => (
            <SidebarGroup key={category}>
              <SidebarGroupLabel>{category}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tools
                    .filter((tool) => tool.category === category)
                    .map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <SidebarMenuItem key={tool.href}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === tool.href}
                            tooltip={tool.title}
                          >
                            <Link to={tool.href}>
                              <Icon />
                              <span>{tool.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-primary/20 px-4 bg-card/50 backdrop-blur-sm">
          <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors" />
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
