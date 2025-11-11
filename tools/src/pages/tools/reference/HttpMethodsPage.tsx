import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const methods = [
  {
    method: "GET",
    description: "Retrieve data from the server",
    details: "Safe and idempotent. Should not modify server state.",
    safe: true,
    idempotent: true,
    cacheable: true,
    category: "Common Methods"
  },
  {
    method: "POST",
    description: "Submit data to the server",
    details: "Not safe or idempotent. Used to create resources or submit data.",
    safe: false,
    idempotent: false,
    cacheable: false,
    category: "Common Methods"
  },
  {
    method: "PUT",
    description: "Replace or create a resource",
    details: "Not safe but idempotent. Replaces entire resource.",
    safe: false,
    idempotent: true,
    cacheable: false,
    category: "Common Methods"
  },
  {
    method: "PATCH",
    description: "Partially modify a resource",
    details: "Not safe. May or may not be idempotent.",
    safe: false,
    idempotent: false,
    cacheable: false,
    category: "Common Methods"
  },
  {
    method: "DELETE",
    description: "Remove a resource from the server",
    details: "Not safe but idempotent.",
    safe: false,
    idempotent: true,
    cacheable: false,
    category: "Common Methods"
  },
  {
    method: "HEAD",
    description: "Same as GET but without response body",
    details: "Safe and idempotent. Used to retrieve headers only.",
    safe: true,
    idempotent: true,
    cacheable: true,
    category: "Common Methods"
  },
  {
    method: "OPTIONS",
    description: "Describe communication options",
    details: "Safe and idempotent. Used for CORS preflight requests.",
    safe: true,
    idempotent: true,
    cacheable: false,
    category: "Less Common Methods"
  },
  {
    method: "CONNECT",
    description: "Establish a tunnel to the server",
    details: "Used for SSL tunneling through proxies.",
    safe: false,
    idempotent: false,
    cacheable: false,
    category: "Less Common Methods"
  },
  {
    method: "TRACE",
    description: "Perform a message loop-back test",
    details: "Echoes the received request. Rarely used.",
    safe: true,
    idempotent: true,
    cacheable: false,
    category: "Less Common Methods"
  },
];

export default function HttpMethodsPage() {
  const [search, setSearch] = useState("");

  const filtered = methods.filter(
    (m) =>
      m.method.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.details.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(methods.map((m) => m.category)));

  const getColor = (method: string) => {
    switch (method) {
      case "GET": return "text-blue-600 dark:text-blue-400";
      case "POST": return "text-green-600 dark:text-green-400";
      case "PUT": return "text-yellow-600 dark:text-yellow-400";
      case "PATCH": return "text-orange-600 dark:text-orange-400";
      case "DELETE": return "text-red-600 dark:text-red-400";
      default: return "text-purple-600 dark:text-purple-400";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTTP Methods Reference</h1>
        <p className="text-muted-foreground">
          Complete guide to HTTP request methods
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find HTTP methods by name or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search methods..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((m) => m.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((method) => (
                  <div
                    key={method.method}
                    className="p-4 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`font-mono text-xl font-bold ${getColor(method.method)} min-w-[5rem]`}>
                        {method.method}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{method.description}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {method.details}
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span className={method.safe ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                            {method.safe ? "✓" : "✗"} Safe
                          </span>
                          <span className={method.idempotent ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                            {method.idempotent ? "✓" : "✗"} Idempotent
                          </span>
                          <span className={method.cacheable ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                            {method.cacheable ? "✓" : "✗"} Cacheable
                          </span>
                        </div>
                      </div>
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
            No methods found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
