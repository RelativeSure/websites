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
    href: "/tools/json-yaml",
    category: "Converters",
  },
  {
    title: "XML ⟷ JSON",
    icon: FileCode,
    href: "/tools/xml-json",
    category: "Converters",
  },
  {
    title: "CSV ⟷ JSON",
    icon: Database,
    href: "/tools/csv-json",
    category: "Converters",
  },
  {
    title: "Timestamp",
    icon: Clock,
    href: "/tools/timestamp",
    category: "Converters",
  },
  {
    title: "Color Converter",
    icon: Palette,
    href: "/tools/color-converter",
    category: "Converters",
  },
  {
    title: "Number Base",
    icon: Calculator,
    href: "/tools/number-base",
    category: "Converters",
  },
  {
    title: "Base Conversion",
    icon: Binary,
    href: "/tools/base-conversion",
    category: "Converters",
  },
  {
    title: "Base64 Image",
    icon: Image,
    href: "/tools/base64-image",
    category: "Converters",
  },
  {
    title: "Unit Converter",
    icon: Ruler,
    href: "/tools/unit-converter",
    category: "Converters",
  },
  {
    title: "JSON → TypeScript",
    icon: FileJson2,
    href: "/tools/json-to-typescript",
    category: "Converters",
  },
  {
    title: "URL Encode",
    icon: Link2,
    href: "/tools/url-encode",
    category: "Encoders",
  },
  {
    title: "HTML Entity",
    icon: Code2,
    href: "/tools/html-entity",
    category: "Encoders",
  },
  {
    title: "Backslash Escape",
    icon: Slash,
    href: "/tools/backslash-escape",
    category: "Encoders",
  },
  {
    title: "Morse Code",
    icon: Radio,
    href: "/tools/morse-code",
    category: "Encoders",
  },
  {
    title: "Cipher (ROT13/Caesar)",
    icon: Shield,
    href: "/tools/cipher",
    category: "Encoders",
  },
  {
    title: "Image → Base64",
    icon: Image,
    href: "/tools/image-to-base64",
    category: "Encoders",
  },
  {
    title: "JWT Decoder",
    icon: KeyRound,
    href: "/tools/jwt-decoder",
    category: "Decoders",
  },
  {
    title: "JSON Formatter",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "Formatters",
  },
  {
    title: "HTML Formatter",
    icon: FileCode2,
    href: "/tools/html-formatter",
    category: "Formatters",
  },
  {
    title: "SQL Formatter",
    icon: Database,
    href: "/tools/sql-formatter",
    category: "Formatters",
  },
  {
    title: "CSS Minifier",
    icon: Paintbrush,
    href: "/tools/css-minifier",
    category: "Formatters",
  },
  {
    title: "JSON Validator",
    icon: CheckCircle,
    href: "/tools/json-validator",
    category: "Validators",
  },
  {
    title: "YAML Validator",
    icon: CheckCircle,
    href: "/tools/yaml-validator",
    category: "Validators",
  },
  {
    title: "Email/IP/Domain Validator",
    icon: ShieldCheck,
    href: "/tools/validator",
    category: "Validators",
  },
  {
    title: "Hash Generator",
    icon: Hash,
    href: "/tools/hash",
    category: "Crypto",
  },
  {
    title: "JWT Generator",
    icon: KeyRound,
    href: "/tools/jwt-generator",
    category: "Crypto",
  },
  {
    title: "HMAC Generator",
    icon: Key,
    href: "/tools/hmac",
    category: "Crypto",
  },
  {
    title: "UUID Generator",
    icon: Fingerprint,
    href: "/tools/uuid",
    category: "Generators",
  },
  {
    title: "Password Generator",
    icon: Lock,
    href: "/tools/password-generator",
    category: "Generators",
  },
  {
    title: "Lorem Ipsum",
    icon: Type,
    href: "/tools/lorem-ipsum",
    category: "Generators",
  },
  {
    title: "Mock Data",
    icon: Users,
    href: "/tools/mock-data",
    category: "Generators",
  },
  {
    title: "Slug Generator",
    icon: Type,
    href: "/tools/slug-generator",
    category: "Generators",
  },
  {
    title: "Color Palette",
    icon: Palette,
    href: "/tools/color-palette",
    category: "Generators",
  },
  {
    title: "QR Code",
    icon: QrCode,
    href: "/tools/qr-code",
    category: "Generators",
  },
  {
    title: "QR Scanner",
    icon: ScanLine,
    href: "/tools/qr-scanner",
    category: "Generators",
  },
  {
    title: "Random Data",
    icon: Shuffle,
    href: "/tools/random-data",
    category: "Generators",
  },
  {
    title: "Text Diff",
    icon: FileText,
    href: "/tools/diff",
    category: "Text Tools",
  },
  {
    title: "Text Analyzer",
    icon: AlignLeft,
    href: "/tools/string-counter",
    category: "Text Tools",
  },
  {
    title: "Text Tools",
    icon: WrapText,
    href: "/tools/text-tools",
    category: "Text Tools",
  },
  {
    title: "ASCII Art",
    icon: Sparkles,
    href: "/tools/ascii-art",
    category: "Text Tools",
  },
  {
    title: "Markdown Preview",
    icon: Eye,
    href: "/tools/markdown-preview",
    category: "Text Tools",
  },
  {
    title: "Case Converter",
    icon: Code2,
    href: "/tools/case-converter",
    category: "Text Tools",
  },
  {
    title: "Regex Tester",
    icon: TestTube,
    href: "/tools/regex-tester",
    category: "Text Tools",
  },
  {
    title: "Cron Parser",
    icon: CalendarClock,
    href: "/tools/cron-parser",
    category: "Dev Tools",
  },
  {
    title: "URL Parser",
    icon: LinkIcon,
    href: "/tools/url-parser",
    category: "Dev Tools",
  },
  {
    title: "User Agent Parser",
    icon: Smartphone,
    href: "/tools/user-agent-parser",
    category: "Dev Tools",
  },
  {
    title: "HTTP Status Codes",
    icon: Info,
    href: "/tools/http-status",
    category: "Reference",
  },
];

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  const categories = Array.from(new Set(tools.map((t) => t.category)));

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
        <SidebarContent>
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
