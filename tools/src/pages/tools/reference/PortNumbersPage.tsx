import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ports = [
  // Well-known ports (0-1023)
  {
    port: 20,
    service: "FTP Data",
    protocol: "TCP",
    description: "File Transfer Protocol (Data)",
    category: "File Transfer",
  },
  {
    port: 21,
    service: "FTP Control",
    protocol: "TCP",
    description: "File Transfer Protocol (Control)",
    category: "File Transfer",
  },
  { port: 22, service: "SSH", protocol: "TCP", description: "Secure Shell", category: "Remote Access" },
  { port: 23, service: "Telnet", protocol: "TCP", description: "Telnet Protocol", category: "Remote Access" },
  { port: 25, service: "SMTP", protocol: "TCP", description: "Simple Mail Transfer Protocol", category: "Email" },
  { port: 53, service: "DNS", protocol: "TCP/UDP", description: "Domain Name System", category: "DNS" },
  {
    port: 67,
    service: "DHCP Server",
    protocol: "UDP",
    description: "Dynamic Host Configuration Protocol",
    category: "Network",
  },
  { port: 68, service: "DHCP Client", protocol: "UDP", description: "DHCP Client", category: "Network" },
  {
    port: 69,
    service: "TFTP",
    protocol: "UDP",
    description: "Trivial File Transfer Protocol",
    category: "File Transfer",
  },
  { port: 80, service: "HTTP", protocol: "TCP", description: "Hypertext Transfer Protocol", category: "Web" },
  { port: 110, service: "POP3", protocol: "TCP", description: "Post Office Protocol v3", category: "Email" },
  { port: 119, service: "NNTP", protocol: "TCP", description: "Network News Transfer Protocol", category: "News" },
  { port: 123, service: "NTP", protocol: "UDP", description: "Network Time Protocol", category: "Time" },
  { port: 143, service: "IMAP", protocol: "TCP", description: "Internet Message Access Protocol", category: "Email" },
  {
    port: 161,
    service: "SNMP",
    protocol: "UDP",
    description: "Simple Network Management Protocol",
    category: "Network",
  },
  { port: 194, service: "IRC", protocol: "TCP", description: "Internet Relay Chat", category: "Chat" },
  {
    port: 389,
    service: "LDAP",
    protocol: "TCP",
    description: "Lightweight Directory Access Protocol",
    category: "Directory",
  },
  { port: 443, service: "HTTPS", protocol: "TCP", description: "HTTP Secure", category: "Web" },
  { port: 465, service: "SMTPS", protocol: "TCP", description: "SMTP Secure", category: "Email" },
  { port: 514, service: "Syslog", protocol: "UDP", description: "System Logging Protocol", category: "Logging" },
  {
    port: 587,
    service: "SMTP (submission)",
    protocol: "TCP",
    description: "Email Message Submission",
    category: "Email",
  },
  { port: 636, service: "LDAPS", protocol: "TCP", description: "LDAP Secure", category: "Directory" },
  { port: 993, service: "IMAPS", protocol: "TCP", description: "IMAP Secure", category: "Email" },
  { port: 995, service: "POP3S", protocol: "TCP", description: "POP3 Secure", category: "Email" },

  // Registered ports (1024-49151)
  { port: 1433, service: "MS SQL Server", protocol: "TCP", description: "Microsoft SQL Server", category: "Database" },
  { port: 1521, service: "Oracle DB", protocol: "TCP", description: "Oracle Database", category: "Database" },
  { port: 1723, service: "PPTP", protocol: "TCP", description: "Point-to-Point Tunneling Protocol", category: "VPN" },
  {
    port: 3000,
    service: "Node.js",
    protocol: "TCP",
    description: "Node.js development server (common)",
    category: "Development",
  },
  { port: 3306, service: "MySQL", protocol: "TCP", description: "MySQL Database", category: "Database" },
  { port: 3389, service: "RDP", protocol: "TCP", description: "Remote Desktop Protocol", category: "Remote Access" },
  {
    port: 4000,
    service: "Development",
    protocol: "TCP",
    description: "Common development server port",
    category: "Development",
  },
  {
    port: 5000,
    service: "Flask/UPnP",
    protocol: "TCP",
    description: "Flask development / UPnP",
    category: "Development",
  },
  { port: 5432, service: "PostgreSQL", protocol: "TCP", description: "PostgreSQL Database", category: "Database" },
  { port: 5900, service: "VNC", protocol: "TCP", description: "Virtual Network Computing", category: "Remote Access" },
  { port: 6379, service: "Redis", protocol: "TCP", description: "Redis Database", category: "Database" },
  {
    port: 8000,
    service: "HTTP Alternate",
    protocol: "TCP",
    description: "Common development server port",
    category: "Development",
  },
  { port: 8080, service: "HTTP Proxy", protocol: "TCP", description: "HTTP Alternative / Proxy", category: "Web" },
  { port: 8443, service: "HTTPS Alternate", protocol: "TCP", description: "HTTPS Alternative", category: "Web" },
  {
    port: 8888,
    service: "HTTP Alternate",
    protocol: "TCP",
    description: "Common development server port",
    category: "Development",
  },
  {
    port: 9000,
    service: "Development",
    protocol: "TCP",
    description: "Common development server port",
    category: "Development",
  },
  { port: 9200, service: "Elasticsearch", protocol: "TCP", description: "Elasticsearch HTTP", category: "Database" },
  { port: 27017, service: "MongoDB", protocol: "TCP", description: "MongoDB Database", category: "Database" },

  // Container & Orchestration
  { port: 2375, service: "Docker", protocol: "TCP", description: "Docker REST API (insecure)", category: "Container" },
  { port: 2376, service: "Docker", protocol: "TCP", description: "Docker REST API (secure)", category: "Container" },
  { port: 6443, service: "Kubernetes", protocol: "TCP", description: "Kubernetes API Server", category: "Container" },

  // Messaging
  { port: 5672, service: "RabbitMQ", protocol: "TCP", description: "AMQP Protocol", category: "Messaging" },
  { port: 9092, service: "Kafka", protocol: "TCP", description: "Apache Kafka", category: "Messaging" },

  // Monitoring
  { port: 9090, service: "Prometheus", protocol: "TCP", description: "Prometheus Server", category: "Monitoring" },
  { port: 3000, service: "Grafana", protocol: "TCP", description: "Grafana Dashboard", category: "Monitoring" },
];

export default function PortNumbersPage() {
  const [search, setSearch] = useState("");

  const filtered = ports.filter(
    (p) =>
      p.port.toString().includes(search) ||
      p.service.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(ports.map((p) => p.category)));

  const getPortColor = (port: number) => {
    if (port < 1024) return "text-blue-600 dark:text-blue-400";
    if (port < 49152) return "text-green-600 dark:text-green-400";
    return "text-purple-600 dark:text-purple-400";
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Port Numbers Reference</h1>
        <p className="text-muted-foreground">Common network port numbers and services</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find ports by number, service name, or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ports..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((p) => p.category === category);
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
                      <th className="p-2 text-left">Port</th>
                      <th className="p-2 text-left">Service</th>
                      <th className="p-2 text-left">Protocol</th>
                      <th className="p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className={`p-2 font-mono text-lg font-bold ${getPortColor(item.port)}`}>{item.port}</td>
                        <td className="p-2 font-semibold">{item.service}</td>
                        <td className="p-2 font-mono text-xs">{item.protocol}</td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
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
            No ports found matching "{search}"
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Port Ranges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-1">
            <div>
              <span className="font-semibold text-blue-600 dark:text-blue-400">0-1023:</span> Well-known ports
              (system/privileged)
            </div>
            <div>
              <span className="font-semibold text-green-600 dark:text-green-400">1024-49151:</span> Registered ports
              (user/application)
            </div>
            <div>
              <span className="font-semibold text-purple-600 dark:text-purple-400">49152-65535:</span> Dynamic/private
              ports
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
