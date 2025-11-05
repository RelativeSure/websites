import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserAgentParser() {
  const [userAgent, setUserAgent] = useState("");
  const [parsed, setParsed] = useState<any>(null);

  useEffect(() => {
    // Set user's current user agent as default
    setUserAgent(navigator.userAgent);
  }, []);

  const parseUserAgent = (ua: string) => {
    setUserAgent(ua);

    if (!ua.trim()) {
      setParsed(null);
      return;
    }

    // Simple user agent parsing
    const info: any = {
      browser: "Unknown",
      browserVersion: "",
      os: "Unknown",
      osVersion: "",
      device: "Desktop",
      engine: "Unknown",
    };

    // Detect browser
    if (ua.includes("Firefox/")) {
      info.browser = "Firefox";
      info.browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "";
      info.engine = "Gecko";
    } else if (ua.includes("Edg/")) {
      info.browser = "Edge";
      info.browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || "";
      info.engine = "Blink";
    } else if (ua.includes("Chrome/")) {
      info.browser = "Chrome";
      info.browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "";
      info.engine = "Blink";
    } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
      info.browser = "Safari";
      info.browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || "";
      info.engine = "WebKit";
    } else if (ua.includes("Opera/") || ua.includes("OPR/")) {
      info.browser = "Opera";
      info.browserVersion = ua.match(/(?:Opera|OPR)\/([\d.]+)/)?.[1] || "";
      info.engine = "Blink";
    }

    // Detect OS
    if (ua.includes("Windows NT")) {
      info.os = "Windows";
      const version = ua.match(/Windows NT ([\d.]+)/)?.[1];
      if (version === "10.0") info.osVersion = "10/11";
      else if (version === "6.3") info.osVersion = "8.1";
      else if (version === "6.2") info.osVersion = "8";
      else if (version === "6.1") info.osVersion = "7";
    } else if (ua.includes("Mac OS X")) {
      info.os = "macOS";
      info.osVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1].replace(/_/g, ".") || "";
    } else if (ua.includes("Linux")) {
      info.os = "Linux";
    } else if (ua.includes("Android")) {
      info.os = "Android";
      info.osVersion = ua.match(/Android ([\d.]+)/)?.[1] || "";
      info.device = "Mobile";
    } else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) {
      info.os = "iOS";
      info.osVersion = ua.match(/OS ([\d_]+)/)?.[1].replace(/_/g, ".") || "";
      info.device = ua.includes("iPad") ? "Tablet" : "Mobile";
    }

    // Detect device type
    if (ua.includes("Mobile") && info.device === "Desktop") {
      info.device = "Mobile";
    } else if (ua.includes("Tablet") || ua.includes("iPad")) {
      info.device = "Tablet";
    }

    setParsed(info);
  };

  useEffect(() => {
    parseUserAgent(userAgent);
  }, []);

  const InfoCard = ({ label, value }: { label: string; value: string }) => (
    <div className="p-4 bg-muted rounded-lg">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">User Agent Parser</h1>
        <p className="text-muted-foreground">
          Parse and analyze browser user agent strings
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Agent String</CardTitle>
          <CardDescription>Enter or paste a user agent string</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="ua">User Agent</Label>
          <Textarea
            id="ua"
            value={userAgent}
            onChange={(e) => parseUserAgent(e.target.value)}
            placeholder="Mozilla/5.0..."
            className="font-mono min-h-[100px] text-sm"
          />
        </CardContent>
      </Card>

      {parsed && (
        <Card>
          <CardHeader>
            <CardTitle>Parsed Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <InfoCard label="Browser" value={`${parsed.browser} ${parsed.browserVersion}`} />
              <InfoCard label="Operating System" value={`${parsed.os} ${parsed.osVersion}`} />
              <InfoCard label="Device Type" value={parsed.device} />
              <InfoCard label="Engine" value={parsed.engine} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
