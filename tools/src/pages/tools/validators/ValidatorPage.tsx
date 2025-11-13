import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function ValidatorPage() {
  const [email, setEmail] = useState("");
  const [ipv4, setIpv4] = useState("");
  const [ipv6, setIpv6] = useState("");
  const [domain, setDomain] = useState("");
  const [creditCard, setCreditCard] = useState("");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateIPv4 = (ip: string): boolean => {
    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  };

  const validateIPv6 = (ip: string): boolean => {
    const re =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    return re.test(ip);
  };

  const validateDomain = (domain: string): boolean => {
    const re = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return re.test(domain);
  };

  const luhnCheck = (num: string): boolean => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  const validateCreditCard = (cc: string): boolean => {
    const cleaned = cc.replace(/\s|-/g, "");
    return /^\d{13,19}$/.test(cleaned) && luhnCheck(cleaned);
  };

  const getCreditCardType = (cc: string): string => {
    const cleaned = cc.replace(/\s|-/g, "");
    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "Mastercard";
    if (/^3[47]/.test(cleaned)) return "American Express";
    if (/^6(?:011|5)/.test(cleaned)) return "Discover";
    return "Unknown";
  };

  const ValidationResult = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div
      className={`flex items-center gap-2 p-3 rounded-md ${isValid ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
    >
      {isValid ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      <span className="font-medium">{text}</span>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Validators</h1>
        <p className="text-muted-foreground">Validate emails, IP addresses, domains, and more</p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="ip">IP Address</TabsTrigger>
          <TabsTrigger value="domain">Domain & CC</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Validator</CardTitle>
              <CardDescription>Check if an email address is valid</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="font-mono"
                />
              </div>

              {email && (
                <ValidationResult
                  isValid={validateEmail(email)}
                  text={validateEmail(email) ? "Valid email address" : "Invalid email address"}
                />
              )}

              <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                <strong>Checked:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Basic email format (user@domain.tld)</li>
                  <li>Contains @ symbol</li>
                  <li>Has domain extension</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>IPv4 Validator</CardTitle>
              <CardDescription>Validate IPv4 addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ipv4">IPv4 Address</Label>
                <Input
                  id="ipv4"
                  value={ipv4}
                  onChange={(e) => setIpv4(e.target.value)}
                  placeholder="192.168.1.1"
                  className="font-mono"
                />
              </div>

              {ipv4 && (
                <ValidationResult
                  isValid={validateIPv4(ipv4)}
                  text={validateIPv4(ipv4) ? "Valid IPv4 address" : "Invalid IPv4 address"}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IPv6 Validator</CardTitle>
              <CardDescription>Validate IPv6 addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ipv6">IPv6 Address</Label>
                <Input
                  id="ipv6"
                  value={ipv6}
                  onChange={(e) => setIpv6(e.target.value)}
                  placeholder="2001:0db8:85a3::8a2e:0370:7334"
                  className="font-mono"
                />
              </div>

              {ipv6 && (
                <ValidationResult
                  isValid={validateIPv6(ipv6)}
                  text={validateIPv6(ipv6) ? "Valid IPv6 address" : "Invalid IPv6 address"}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Domain Validator</CardTitle>
              <CardDescription>Validate domain names</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="font-mono"
                />
              </div>

              {domain && (
                <ValidationResult
                  isValid={validateDomain(domain)}
                  text={validateDomain(domain) ? "Valid domain name" : "Invalid domain name"}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Card Validator</CardTitle>
              <CardDescription>Validate credit card numbers (Luhn algorithm)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cc">Credit Card Number</Label>
                <Input
                  id="cc"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                  placeholder="4532 1488 0343 6467"
                  className="font-mono"
                />
              </div>

              {creditCard && (
                <>
                  <ValidationResult
                    isValid={validateCreditCard(creditCard)}
                    text={validateCreditCard(creditCard) ? "Valid credit card number" : "Invalid credit card number"}
                  />

                  {validateCreditCard(creditCard) && (
                    <div className="p-3 bg-primary/10 rounded-md">
                      <strong className="text-sm">Card Type:</strong>
                      <span className="ml-2 text-sm">{getCreditCardType(creditCard)}</span>
                    </div>
                  )}
                </>
              )}

              <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                <strong>Note:</strong> This validates the format and checksum only. Does not verify if the card is
                active or has funds.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
