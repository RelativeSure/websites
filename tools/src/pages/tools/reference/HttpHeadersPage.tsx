import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const headers = [
  // Request Headers
  { name: "Accept", description: "Media types that are acceptable for the response", category: "Request Headers" },
  { name: "Accept-Encoding", description: "Acceptable encodings (e.g., gzip, deflate)", category: "Request Headers" },
  { name: "Accept-Language", description: "Acceptable languages for response", category: "Request Headers" },
  {
    name: "Authorization",
    description: "Authentication credentials for HTTP authentication",
    category: "Request Headers",
  },
  { name: "Cache-Control", description: "Directives for caching mechanisms", category: "Request Headers" },
  { name: "Cookie", description: "HTTP cookies previously sent by the server", category: "Request Headers" },
  { name: "Content-Type", description: "MIME type of the body of the request", category: "Request Headers" },
  { name: "Content-Length", description: "Length of the request body in bytes", category: "Request Headers" },
  { name: "Host", description: "Domain name of the server", category: "Request Headers" },
  { name: "Origin", description: "Origin of the request (for CORS)", category: "Request Headers" },
  { name: "Referer", description: "Address of the previous web page", category: "Request Headers" },
  { name: "User-Agent", description: "User agent string of the client", category: "Request Headers" },
  {
    name: "If-Modified-Since",
    description: "Conditional request - only send if modified",
    category: "Request Headers",
  },
  { name: "If-None-Match", description: "Conditional request - ETags", category: "Request Headers" },
  { name: "Range", description: "Request only part of an entity", category: "Request Headers" },

  // Response Headers
  {
    name: "Access-Control-Allow-Origin",
    description: "Specifies origins allowed to access the resource (CORS)",
    category: "Response Headers",
  },
  {
    name: "Access-Control-Allow-Methods",
    description: "Methods allowed when accessing the resource (CORS)",
    category: "Response Headers",
  },
  {
    name: "Access-Control-Allow-Headers",
    description: "Headers allowed when accessing the resource (CORS)",
    category: "Response Headers",
  },
  { name: "Cache-Control", description: "Directives for caching mechanisms", category: "Response Headers" },
  { name: "Content-Encoding", description: "Encoding used on the data", category: "Response Headers" },
  { name: "Content-Type", description: "MIME type of the response body", category: "Response Headers" },
  { name: "Content-Length", description: "Length of the response body in bytes", category: "Response Headers" },
  { name: "ETag", description: "Identifier for a specific version of a resource", category: "Response Headers" },
  {
    name: "Expires",
    description: "Date/time after which the response is considered stale",
    category: "Response Headers",
  },
  { name: "Last-Modified", description: "Last modification date of the resource", category: "Response Headers" },
  {
    name: "Location",
    description: "Used in redirects or when a resource has been created",
    category: "Response Headers",
  },
  { name: "Set-Cookie", description: "Send cookies from server to client", category: "Response Headers" },
  { name: "Server", description: "Information about the server software", category: "Response Headers" },
  { name: "Strict-Transport-Security", description: "HSTS - enforce HTTPS connections", category: "Response Headers" },
  { name: "X-Content-Type-Options", description: "Disable MIME type sniffing", category: "Response Headers" },
  { name: "X-Frame-Options", description: "Clickjacking protection", category: "Response Headers" },
  { name: "X-XSS-Protection", description: "Cross-site scripting filter", category: "Response Headers" },

  // Security Headers
  {
    name: "Content-Security-Policy",
    description: "Controls resources the browser is allowed to load",
    category: "Security Headers",
  },
  { name: "X-Content-Security-Policy", description: "Legacy CSP header", category: "Security Headers" },
  { name: "Permissions-Policy", description: "Controls browser features and APIs", category: "Security Headers" },
  {
    name: "Referrer-Policy",
    description: "Controls how much referrer information is sent",
    category: "Security Headers",
  },
];

export default function HttpHeadersPage() {
  const [search, setSearch] = useState("");

  const filtered = headers.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) || h.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(headers.map((h) => h.category)));

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTTP Headers Reference</h1>
        <p className="text-muted-foreground">Common HTTP request and response headers</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find HTTP headers by name or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or description..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((h) => h.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((header) => (
                  <div
                    key={header.name}
                    className="p-4 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <div className="font-mono text-sm font-bold text-primary mb-1">{header.name}</div>
                    <div className="text-sm text-muted-foreground">{header.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No headers found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
