import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

interface LayoutProps<_T = string> {
  children: ReactNode;
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
