import { HomeLayout } from "fumadocs-ui/layouts/home";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Personal Docs",
    template: "%s | Personal Docs",
  },
  description: "Personal CV and documentation site",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <HomeLayout {...baseOptions()}>{children}</HomeLayout>
        </RootProvider>
      </body>
    </html>
  );
}
