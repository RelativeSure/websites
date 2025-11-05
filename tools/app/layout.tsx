import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Tools - JSON, YAML, Base64, Hash & More",
  description: "A comprehensive collection of developer tools including JSON to YAML converter, Base64 encoder/decoder, hash generators, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
