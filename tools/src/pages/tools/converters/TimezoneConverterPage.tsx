import { Clock, Globe, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimezoneResult {
  timezone: string;
  time: string;
  date: string;
  offset: string;
}

export default function TimezoneConverterPage() {
  const [sourceTime, setSourceTime] = useState("");
  const [sourceDate, setSourceDate] = useState("");
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const [targetTimezones, setTargetTimezones] = useState<string[]>(["America/New_York", "Europe/London", "Asia/Tokyo"]);
  const [results, setResults] = useState<TimezoneResult[]>([]);

  // Common timezones grouped by region
  const timezones = {
    Popular: [
      "UTC",
      "America/New_York",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Australia/Sydney",
    ],
    Americas: [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Toronto",
      "America/Mexico_City",
      "America/Sao_Paulo",
      "America/Buenos_Aires",
    ],
    Europe: [
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Europe/Rome",
      "Europe/Madrid",
      "Europe/Amsterdam",
      "Europe/Stockholm",
      "Europe/Moscow",
    ],
    Asia: [
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Asia/Hong_Kong",
      "Asia/Singapore",
      "Asia/Dubai",
      "Asia/Mumbai",
      "Asia/Bangkok",
      "Asia/Seoul",
    ],
    Pacific: ["Australia/Sydney", "Australia/Melbourne", "Pacific/Auckland", "Pacific/Fiji", "Pacific/Honolulu"],
  };

  useEffect(() => {
    // Set current time on mount
    const now = new Date();
    setSourceDate(now.toISOString().split("T")[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  }, []);

  useEffect(() => {
    if (sourceTime && sourceDate) {
      convertTimezones();
    }
  }, [sourceTime, sourceDate, convertTimezones]);

  const convertTimezones = () => {
    try {
      // Create date from source timezone
      const dateTimeString = `${sourceDate}T${sourceTime}:00`;
      const sourceDateTime = new Date(dateTimeString + getTimezoneOffset(sourceTimezone));

      const converted: TimezoneResult[] = targetTimezones.map((tz) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        const parts = formatter.formatToParts(sourceDateTime);
        const getValue = (type: string) => parts.find((p) => p.type === type)?.value || "";

        const time = `${getValue("hour")}:${getValue("minute")}`;
        const date = `${getValue("year")}-${getValue("month")}-${getValue("day")}`;

        // Get offset
        const offsetFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          timeZoneName: "shortOffset",
        });
        const offsetParts = offsetFormatter.formatToParts(sourceDateTime);
        const offset = offsetParts.find((p) => p.type === "timeZoneName")?.value || "";

        return {
          timezone: tz,
          time,
          date,
          offset,
        };
      });

      setResults(converted);
    } catch (err) {
      console.error("Conversion failed:", err);
    }
  };

  const getTimezoneOffset = (tz: string): string => {
    try {
      const date = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        timeZoneName: "shortOffset",
      });
      const parts = formatter.formatToParts(date);
      const _offset = parts.find((p) => p.type === "timeZoneName")?.value || "";
      return ""; // Return empty for now, let browser handle it
    } catch {
      return "";
    }
  };

  const addTimezone = () => {
    const availableTz = Object.values(timezones)
      .flat()
      .find((tz) => !targetTimezones.includes(tz));
    if (availableTz) {
      setTargetTimezones([...targetTimezones, availableTz]);
    }
  };

  const removeTimezone = (index: number) => {
    setTargetTimezones(targetTimezones.filter((_, i) => i !== index));
  };

  const setToNow = () => {
    const now = new Date();
    setSourceDate(now.toISOString().split("T")[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Timezone Converter</h1>
        <p className="text-muted-foreground">Convert times between different timezones</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Source Time & Timezone
          </CardTitle>
          <CardDescription>Enter the time and timezone you want to convert from</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-date">Date</Label>
              <Input id="source-date" type="date" value={sourceDate} onChange={(e) => setSourceDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-time">Time</Label>
              <Input id="source-time" type="time" value={sourceTime} onChange={(e) => setSourceTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-tz">Timezone</Label>
              <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(timezones).map(([region, tzList]) => (
                    <div key={region}>
                      <div className="px-2 py-1.5 text-sm font-semibold">{region}</div>
                      {tzList.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" onClick={setToNow} className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Set to Current Time
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Converted Times</CardTitle>
            <Button variant="outline" size="sm" onClick={addTimezone}>
              <Plus className="h-4 w-4 mr-1" />
              Add Timezone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Enter a time and date to see conversions</div>
          ) : (
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-md bg-muted/30">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{result.timezone.replace(/_/g, " ")}</div>
                    <div className="text-2xl font-mono font-bold mt-1">{result.time}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {result.date} • {result.offset}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeTimezone(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Timezones</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Time conversions account for Daylight Saving Time (DST) where applicable</p>
          <p>• UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks</p>
          <p>• Timezone offsets are shown in the format GMT+XX or GMT-XX</p>
          <p>• Add multiple target timezones to compare times across different regions</p>
        </CardContent>
      </Card>
    </div>
  );
}
