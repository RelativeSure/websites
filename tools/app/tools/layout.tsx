"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    title: "Base64",
    icon: Binary,
    href: "/tools/base64",
    category: "Encoders",
  },
  {
    title: "URL Encode",
    icon: Link2,
    href: "/tools/url-encode",
    category: "Encoders",
  },
  {
    title: "Hash Generator",
    icon: Hash,
    href: "/tools/hash",
    category: "Crypto",
  },
  {
    title: "UUID Generator",
    icon: Fingerprint,
    href: "/tools/uuid",
    category: "Generators",
  },
  {
    title: "Timestamp",
    icon: Clock,
    href: "/tools/timestamp",
    category: "Converters",
  },
  {
    title: "JSON Formatter",
    icon: Braces,
    href: "/tools/json-formatter",
    category: "Formatters",
  },
  {
    title: "Text Diff",
    icon: FileText,
    href: "/tools/diff",
    category: "Text Tools",
  },
  {
    title: "Case Converter",
    icon: Code2,
    href: "/tools/case-converter",
    category: "Text Tools",
  },
];

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="border-b">
          <Link href="/" className="flex items-center gap-2 px-2 py-2 hover:bg-sidebar-accent rounded-md transition-colors">
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
                            <Link href={tool.href}>
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
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Developer Tools</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
