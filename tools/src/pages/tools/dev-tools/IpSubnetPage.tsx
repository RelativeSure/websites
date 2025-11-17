import { Calculator } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SubnetInfo {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  binary: {
    ip: string;
    mask: string;
    network: string;
  };
}

export default function IpSubnetPage() {
  const [ipInput, setIpInput] = useState("192.168.1.100");
  const [cidrInput, setCidrInput] = useState("24");
  const [result, setResult] = useState<SubnetInfo | null>(null);
  const [error, setError] = useState("");

  const ipToBinary = (ip: string): string => {
    return ip
      .split(".")
      .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
      .join(".");
  };

  const _binaryToIp = (binary: string): string => {
    return binary
      .split(".")
      .map((octet) => parseInt(octet, 2).toString())
      .join(".");
  };

  const cidrToMask = (cidr: number): string => {
    const mask = "1".repeat(cidr) + "0".repeat(32 - cidr);
    return [0, 8, 16, 24].map((i) => parseInt(mask.slice(i, i + 8), 2)).join(".");
  };

  const getWildcardMask = (mask: string): string => {
    return mask
      .split(".")
      .map((octet) => (255 - parseInt(octet, 10)).toString())
      .join(".");
  };

  const getNetworkAddress = (ip: string, mask: string): string => {
    const ipOctets = ip.split(".").map(Number);
    const maskOctets = mask.split(".").map(Number);
    return ipOctets.map((octet, i) => octet & maskOctets[i]).join(".");
  };

  const getBroadcastAddress = (network: string, wildcard: string): string => {
    const networkOctets = network.split(".").map(Number);
    const wildcardOctets = wildcard.split(".").map(Number);
    return networkOctets.map((octet, i) => octet | wildcardOctets[i]).join(".");
  };

  const incrementIp = (ip: string): string => {
    const octets = ip.split(".").map(Number);
    for (let i = 3; i >= 0; i--) {
      if (octets[i] < 255) {
        octets[i]++;
        break;
      } else {
        octets[i] = 0;
      }
    }
    return octets.join(".");
  };

  const decrementIp = (ip: string): string => {
    const octets = ip.split(".").map(Number);
    for (let i = 3; i >= 0; i--) {
      if (octets[i] > 0) {
        octets[i]--;
        break;
      } else {
        octets[i] = 255;
      }
    }
    return octets.join(".");
  };

  const getIpClass = (ip: string): string => {
    const firstOctet = parseInt(ip.split(".")[0], 10);
    if (firstOctet >= 1 && firstOctet <= 126) return "A";
    if (firstOctet >= 128 && firstOctet <= 191) return "B";
    if (firstOctet >= 192 && firstOctet <= 223) return "C";
    if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
    if (firstOctet >= 240 && firstOctet <= 255) return "E (Reserved)";
    return "Unknown";
  };

  const calculate = () => {
    try {
      // Validate IP address
      const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
      const ipMatch = ipInput.match(ipRegex);
      if (!ipMatch || ipMatch.slice(1).some((octet) => parseInt(octet, 10) > 255)) {
        throw new Error("Invalid IP address");
      }

      // Validate CIDR
      const cidr = parseInt(cidrInput, 10);
      if (Number.isNaN(cidr) || cidr < 0 || cidr > 32) {
        throw new Error("CIDR must be between 0 and 32");
      }

      const subnetMask = cidrToMask(cidr);
      const wildcardMask = getWildcardMask(subnetMask);
      const networkAddress = getNetworkAddress(ipInput, subnetMask);
      const broadcastAddress = getBroadcastAddress(networkAddress, wildcardMask);
      const firstHost = cidr === 32 ? networkAddress : incrementIp(networkAddress);
      const lastHost = cidr === 32 ? broadcastAddress : decrementIp(broadcastAddress);
      const totalHosts = 2 ** (32 - cidr);
      const usableHosts = cidr === 32 ? 1 : cidr === 31 ? 2 : totalHosts - 2;

      setResult({
        ipAddress: ipInput,
        cidr,
        subnetMask,
        wildcardMask,
        networkAddress,
        broadcastAddress,
        firstHost,
        lastHost,
        totalHosts,
        usableHosts,
        ipClass: getIpClass(ipInput),
        binary: {
          ip: ipToBinary(ipInput),
          mask: ipToBinary(subnetMask),
          network: ipToBinary(networkAddress),
        },
      });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const commonSubnets = [
    { name: "/8 - Class A", cidr: 8, hosts: "16,777,214" },
    { name: "/16 - Class B", cidr: 16, hosts: "65,534" },
    { name: "/24 - Class C", cidr: 24, hosts: "254" },
    { name: "/25 - Half Class C", cidr: 25, hosts: "126" },
    { name: "/26 - Quarter C", cidr: 26, hosts: "62" },
    { name: "/27", cidr: 27, hosts: "30" },
    { name: "/28", cidr: 28, hosts: "14" },
    { name: "/29", cidr: 29, hosts: "6" },
    { name: "/30 - Point-to-Point", cidr: 30, hosts: "2" },
    { name: "/32 - Single Host", cidr: 32, hosts: "1" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">IP Subnet Calculator</h1>
        <p className="text-muted-foreground">Calculate network addresses, subnet masks, and host ranges</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>IP Address & CIDR</CardTitle>
          <CardDescription>Enter an IPv4 address and CIDR notation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ip">IP Address</Label>
              <Input
                id="ip"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="192.168.1.100"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidr">CIDR</Label>
              <Input
                id="cidr"
                value={cidrInput}
                onChange={(e) => setCidrInput(e.target.value)}
                placeholder="24"
                className="font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <Button onClick={calculate} className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Subnet
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">IP Address</div>
                  <div className="font-mono text-lg">
                    {result.ipAddress}/{result.cidr}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">IP Class</div>
                  <div className="font-mono">{result.ipClass}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Subnet Mask</div>
                  <div className="font-mono">{result.subnetMask}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Wildcard Mask</div>
                  <div className="font-mono">{result.wildcardMask}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Network Address</div>
                  <div className="font-mono text-lg">{result.networkAddress}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Broadcast Address</div>
                  <div className="font-mono text-lg">{result.broadcastAddress}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">First Host</div>
                  <div className="font-mono">{result.firstHost}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Host</div>
                  <div className="font-mono">{result.lastHost}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Host Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">{result.totalHosts.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Addresses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{result.usableHosts.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Usable Hosts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Binary Representation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-mono text-sm">
              <div>
                <div className="text-muted-foreground mb-1">IP Address:</div>
                <div className="p-2 bg-muted rounded">{result.binary.ip}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Subnet Mask:</div>
                <div className="p-2 bg-muted rounded">{result.binary.mask}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Network Address:</div>
                <div className="p-2 bg-muted rounded">{result.binary.network}</div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Common Subnet Masks</CardTitle>
          <CardDescription>Click to use a common CIDR notation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {commonSubnets.map((subnet, i) => (
              <button
                key={i}
                onClick={() => setCidrInput(subnet.cidr.toString())}
                className="p-3 text-left border rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-semibold text-sm">{subnet.name}</div>
                <div className="text-xs text-muted-foreground">{subnet.hosts} hosts</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
