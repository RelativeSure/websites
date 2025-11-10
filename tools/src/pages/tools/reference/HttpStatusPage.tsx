import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statusCodes = [
  // 1xx Informational
  { code: 100, message: "Continue", category: "1xx Informational" },
  { code: 101, message: "Switching Protocols", category: "1xx Informational" },
  { code: 102, message: "Processing", category: "1xx Informational" },
  { code: 103, message: "Early Hints", category: "1xx Informational" },

  // 2xx Success
  { code: 200, message: "OK", category: "2xx Success" },
  { code: 201, message: "Created", category: "2xx Success" },
  { code: 202, message: "Accepted", category: "2xx Success" },
  { code: 203, message: "Non-Authoritative Information", category: "2xx Success" },
  { code: 204, message: "No Content", category: "2xx Success" },
  { code: 205, message: "Reset Content", category: "2xx Success" },
  { code: 206, message: "Partial Content", category: "2xx Success" },
  { code: 207, message: "Multi-Status", category: "2xx Success" },
  { code: 208, message: "Already Reported", category: "2xx Success" },
  { code: 226, message: "IM Used", category: "2xx Success" },

  // 3xx Redirection
  { code: 300, message: "Multiple Choices", category: "3xx Redirection" },
  { code: 301, message: "Moved Permanently", category: "3xx Redirection" },
  { code: 302, message: "Found", category: "3xx Redirection" },
  { code: 303, message: "See Other", category: "3xx Redirection" },
  { code: 304, message: "Not Modified", category: "3xx Redirection" },
  { code: 305, message: "Use Proxy", category: "3xx Redirection" },
  { code: 306, message: "Switch Proxy (Unused)", category: "3xx Redirection" },
  { code: 307, message: "Temporary Redirect", category: "3xx Redirection" },
  { code: 308, message: "Permanent Redirect", category: "3xx Redirection" },

  // 4xx Client Error
  { code: 400, message: "Bad Request", category: "4xx Client Error" },
  { code: 401, message: "Unauthorized", category: "4xx Client Error" },
  { code: 402, message: "Payment Required", category: "4xx Client Error" },
  { code: 403, message: "Forbidden", category: "4xx Client Error" },
  { code: 404, message: "Not Found", category: "4xx Client Error" },
  { code: 405, message: "Method Not Allowed", category: "4xx Client Error" },
  { code: 406, message: "Not Acceptable", category: "4xx Client Error" },
  { code: 407, message: "Proxy Authentication Required", category: "4xx Client Error" },
  { code: 408, message: "Request Timeout", category: "4xx Client Error" },
  { code: 409, message: "Conflict", category: "4xx Client Error" },
  { code: 410, message: "Gone", category: "4xx Client Error" },
  { code: 411, message: "Length Required", category: "4xx Client Error" },
  { code: 412, message: "Precondition Failed", category: "4xx Client Error" },
  { code: 413, message: "Payload Too Large", category: "4xx Client Error" },
  { code: 414, message: "URI Too Long", category: "4xx Client Error" },
  { code: 415, message: "Unsupported Media Type", category: "4xx Client Error" },
  { code: 416, message: "Range Not Satisfiable", category: "4xx Client Error" },
  { code: 417, message: "Expectation Failed", category: "4xx Client Error" },
  { code: 418, message: "I'm a teapot 🫖", category: "4xx Client Error" },
  { code: 421, message: "Misdirected Request", category: "4xx Client Error" },
  { code: 422, message: "Unprocessable Entity", category: "4xx Client Error" },
  { code: 423, message: "Locked", category: "4xx Client Error" },
  { code: 424, message: "Failed Dependency", category: "4xx Client Error" },
  { code: 425, message: "Too Early", category: "4xx Client Error" },
  { code: 426, message: "Upgrade Required", category: "4xx Client Error" },
  { code: 428, message: "Precondition Required", category: "4xx Client Error" },
  { code: 429, message: "Too Many Requests", category: "4xx Client Error" },
  { code: 431, message: "Request Header Fields Too Large", category: "4xx Client Error" },
  { code: 451, message: "Unavailable For Legal Reasons", category: "4xx Client Error" },

  // 5xx Server Error
  { code: 500, message: "Internal Server Error", category: "5xx Server Error" },
  { code: 501, message: "Not Implemented", category: "5xx Server Error" },
  { code: 502, message: "Bad Gateway", category: "5xx Server Error" },
  { code: 503, message: "Service Unavailable", category: "5xx Server Error" },
  { code: 504, message: "Gateway Timeout", category: "5xx Server Error" },
  { code: 505, message: "HTTP Version Not Supported", category: "5xx Server Error" },
  { code: 506, message: "Variant Also Negotiates", category: "5xx Server Error" },
  { code: 507, message: "Insufficient Storage", category: "5xx Server Error" },
  { code: 508, message: "Loop Detected", category: "5xx Server Error" },
  { code: 510, message: "Not Extended", category: "5xx Server Error" },
  { code: 511, message: "Network Authentication Required", category: "5xx Server Error" },
];

export default function HttpStatusCodes() {
  const [search, setSearch] = useState("");

  const filtered = statusCodes.filter(
    (s) =>
      s.code.toString().includes(search) ||
      s.message.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(statusCodes.map((s) => s.category)));

  const getColor = (code: number) => {
    if (code < 200) return "text-blue-600 dark:text-blue-400";
    if (code < 300) return "text-green-600 dark:text-green-400";
    if (code < 400) return "text-yellow-600 dark:text-yellow-400";
    if (code < 500) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTTP Status Codes</h1>
        <p className="text-muted-foreground">
          Reference guide for HTTP status codes
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find HTTP status codes by code or message</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code or message..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((s) => s.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((status) => (
                  <div
                    key={status.code}
                    className="flex items-center gap-4 p-3 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <div className={`font-mono text-2xl font-bold ${getColor(status.code)} min-w-[4rem]`}>
                      {status.code}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{status.message}</div>
                    </div>
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
            No status codes found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
