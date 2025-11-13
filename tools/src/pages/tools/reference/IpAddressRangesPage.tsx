import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ranges = [
  // Private IPv4
  {
    range: "10.0.0.0/8",
    cidr: "10.0.0.0 - 10.255.255.255",
    addresses: "16,777,216",
    description: "Private network - Class A",
    rfc: "RFC 1918",
    category: "Private IPv4",
  },
  {
    range: "172.16.0.0/12",
    cidr: "172.16.0.0 - 172.31.255.255",
    addresses: "1,048,576",
    description: "Private network - Class B",
    rfc: "RFC 1918",
    category: "Private IPv4",
  },
  {
    range: "192.168.0.0/16",
    cidr: "192.168.0.0 - 192.168.255.255",
    addresses: "65,536",
    description: "Private network - Class C",
    rfc: "RFC 1918",
    category: "Private IPv4",
  },

  // Loopback & Special
  {
    range: "127.0.0.0/8",
    cidr: "127.0.0.0 - 127.255.255.255",
    addresses: "16,777,216",
    description: "Loopback addresses",
    rfc: "RFC 1122",
    category: "Special Use IPv4",
  },
  {
    range: "0.0.0.0/8",
    cidr: "0.0.0.0 - 0.255.255.255",
    addresses: "16,777,216",
    description: "Current network (only valid as source)",
    rfc: "RFC 1122",
    category: "Special Use IPv4",
  },
  {
    range: "169.254.0.0/16",
    cidr: "169.254.0.0 - 169.254.255.255",
    addresses: "65,536",
    description: "Link-local / APIPA",
    rfc: "RFC 3927",
    category: "Special Use IPv4",
  },
  {
    range: "224.0.0.0/4",
    cidr: "224.0.0.0 - 239.255.255.255",
    addresses: "268,435,456",
    description: "Multicast",
    rfc: "RFC 5771",
    category: "Special Use IPv4",
  },
  {
    range: "240.0.0.0/4",
    cidr: "240.0.0.0 - 255.255.255.255",
    addresses: "268,435,456",
    description: "Reserved for future use",
    rfc: "RFC 1112",
    category: "Special Use IPv4",
  },
  {
    range: "255.255.255.255/32",
    cidr: "255.255.255.255",
    addresses: "1",
    description: "Broadcast address",
    rfc: "RFC 919",
    category: "Special Use IPv4",
  },

  // Documentation & Testing
  {
    range: "192.0.2.0/24",
    cidr: "192.0.2.0 - 192.0.2.255",
    addresses: "256",
    description: "Documentation and examples (TEST-NET-1)",
    rfc: "RFC 5737",
    category: "Documentation IPv4",
  },
  {
    range: "198.51.100.0/24",
    cidr: "198.51.100.0 - 198.51.100.255",
    addresses: "256",
    description: "Documentation and examples (TEST-NET-2)",
    rfc: "RFC 5737",
    category: "Documentation IPv4",
  },
  {
    range: "203.0.113.0/24",
    cidr: "203.0.113.0 - 203.0.113.255",
    addresses: "256",
    description: "Documentation and examples (TEST-NET-3)",
    rfc: "RFC 5737",
    category: "Documentation IPv4",
  },
  {
    range: "192.88.99.0/24",
    cidr: "192.88.99.0 - 192.88.99.255",
    addresses: "256",
    description: "6to4 relay anycast",
    rfc: "RFC 3068",
    category: "Documentation IPv4",
  },
  {
    range: "198.18.0.0/15",
    cidr: "198.18.0.0 - 198.19.255.255",
    addresses: "131,072",
    description: "Benchmark testing",
    rfc: "RFC 2544",
    category: "Documentation IPv4",
  },

  // Carrier-Grade NAT
  {
    range: "100.64.0.0/10",
    cidr: "100.64.0.0 - 100.127.255.255",
    addresses: "4,194,304",
    description: "Carrier-grade NAT",
    rfc: "RFC 6598",
    category: "Special Use IPv4",
  },

  // Private IPv6
  {
    range: "fc00::/7",
    cidr: "fc00:: - fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^121",
    description: "Unique Local Addresses (ULA)",
    rfc: "RFC 4193",
    category: "Private IPv6",
  },
  {
    range: "fd00::/8",
    cidr: "fd00:: - fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^120",
    description: "Unique Local Addresses (ULA) - commonly used",
    rfc: "RFC 4193",
    category: "Private IPv6",
  },

  // Special IPv6
  {
    range: "::1/128",
    cidr: "::1",
    addresses: "1",
    description: "Loopback address",
    rfc: "RFC 4291",
    category: "Special Use IPv6",
  },
  {
    range: "::/128",
    cidr: "::",
    addresses: "1",
    description: "Unspecified address",
    rfc: "RFC 4291",
    category: "Special Use IPv6",
  },
  {
    range: "fe80::/10",
    cidr: "fe80:: - febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^118",
    description: "Link-local addresses",
    rfc: "RFC 4291",
    category: "Special Use IPv6",
  },
  {
    range: "ff00::/8",
    cidr: "ff00:: - ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^120",
    description: "Multicast addresses",
    rfc: "RFC 4291",
    category: "Special Use IPv6",
  },
  {
    range: "2001:db8::/32",
    cidr: "2001:db8:: - 2001:db8:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^96",
    description: "Documentation and examples",
    rfc: "RFC 3849",
    category: "Documentation IPv6",
  },
  {
    range: "2002::/16",
    cidr: "2002:: - 2002:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^112",
    description: "6to4 addressing",
    rfc: "RFC 3056",
    category: "Special Use IPv6",
  },

  // Global IPv6
  {
    range: "2000::/3",
    cidr: "2000:: - 3fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
    addresses: "2^125",
    description: "Global Unicast",
    rfc: "RFC 4291",
    category: "Global IPv6",
  },

  // CIDR Common Subnets
  {
    range: "/8",
    cidr: "x.0.0.0 - x.255.255.255",
    addresses: "16,777,216",
    description: "Class A network",
    rfc: "CIDR",
    category: "Subnet Masks",
  },
  {
    range: "/16",
    cidr: "x.x.0.0 - x.x.255.255",
    addresses: "65,536",
    description: "Class B network",
    rfc: "CIDR",
    category: "Subnet Masks",
  },
  {
    range: "/24",
    cidr: "x.x.x.0 - x.x.x.255",
    addresses: "256",
    description: "Class C network (common)",
    rfc: "CIDR",
    category: "Subnet Masks",
  },
  {
    range: "/30",
    cidr: "4 addresses",
    addresses: "4",
    description: "Point-to-point links",
    rfc: "CIDR",
    category: "Subnet Masks",
  },
  {
    range: "/32",
    cidr: "1 address",
    addresses: "1",
    description: "Single host",
    rfc: "CIDR",
    category: "Subnet Masks",
  },
];

export default function IpAddressRangesPage() {
  const [search, setSearch] = useState("");

  const filtered = ranges.filter(
    (r) =>
      r.range.toLowerCase().includes(search.toLowerCase()) ||
      r.cidr.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(ranges.map((r) => r.category)));

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">IP Address Ranges Reference</h1>
        <p className="text-muted-foreground">Reserved and special-use IP address ranges</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find IP ranges by CIDR, range, or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search IP ranges..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((r) => r.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">CIDR</th>
                      <th className="p-2 text-left">Range</th>
                      <th className="p-2 text-left">Addresses</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">RFC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className="p-2 font-mono font-bold text-primary">{item.range}</td>
                        <td className="p-2 font-mono text-xs text-muted-foreground">{item.cidr}</td>
                        <td className="p-2 font-mono text-xs">{item.addresses}</td>
                        <td className="p-2">{item.description}</td>
                        <td className="p-2 text-xs text-muted-foreground">{item.rfc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No IP ranges found matching "{search}"
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-2">Private Networks:</div>
              <div className="space-y-1 text-muted-foreground">
                <div>• 10.0.0.0/8 - Large private networks</div>
                <div>• 172.16.0.0/12 - Medium private networks</div>
                <div>• 192.168.0.0/16 - Small private networks</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2">Common Subnets:</div>
              <div className="space-y-1 text-muted-foreground">
                <div>• /24 = 256 addresses (254 usable)</div>
                <div>• /30 = 4 addresses (2 usable)</div>
                <div>• /32 = Single host</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
