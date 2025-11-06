import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Check, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CronBuilderPage() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCronExpression(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cronExpression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getDescription = (): string => {
    const parts: string[] = [];

    // Minute
    if (minute === "*") parts.push("every minute");
    else if (minute.includes("/")) parts.push(`every ${minute.split("/")[1]} minutes`);
    else if (minute.includes(",")) parts.push(`at minutes ${minute}`);
    else parts.push(`at minute ${minute}`);

    // Hour
    if (hour === "*") parts.push("of every hour");
    else if (hour.includes("/")) parts.push(`every ${hour.split("/")[1]} hours`);
    else if (hour.includes(",")) parts.push(`at hours ${hour}`);
    else parts.push(`at ${hour}:00`);

    // Day of month
    if (dayOfMonth !== "*") {
      if (dayOfMonth.includes("/")) parts.push(`every ${dayOfMonth.split("/")[1]} days`);
      else if (dayOfMonth.includes(",")) parts.push(`on days ${dayOfMonth}`);
      else parts.push(`on day ${dayOfMonth}`);
    }

    // Month
    if (month !== "*") {
      const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (month.includes(",")) {
        const months = month.split(",").map(m => monthNames[parseInt(m)]).join(", ");
        parts.push(`in ${months}`);
      } else {
        parts.push(`in ${monthNames[parseInt(month)]}`);
      }
    }

    // Day of week
    if (dayOfWeek !== "*") {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      if (dayOfWeek.includes(",")) {
        const days = dayOfWeek.split(",").map(d => dayNames[parseInt(d)]).join(", ");
        parts.push(`on ${days}`);
      } else {
        parts.push(`on ${dayNames[parseInt(dayOfWeek)]}`);
      }
    }

    return parts.join(" ");
  };

  const presets = [
    { name: "Every minute", value: "* * * * *" },
    { name: "Every 5 minutes", value: "*/5 * * * *" },
    { name: "Every 15 minutes", value: "*/15 * * * *" },
    { name: "Every 30 minutes", value: "*/30 * * * *" },
    { name: "Every hour", value: "0 * * * *" },
    { name: "Every 6 hours", value: "0 */6 * * *" },
    { name: "Daily at midnight", value: "0 0 * * *" },
    { name: "Daily at noon", value: "0 12 * * *" },
    { name: "Weekly on Sunday", value: "0 0 * * 0" },
    { name: "Monthly on 1st", value: "0 0 1 * *" },
    { name: "Weekdays at 9 AM", value: "0 9 * * 1-5" },
    { name: "Weekends at 10 AM", value: "0 10 * * 0,6" },
  ];

  const applyPreset = (preset: string) => {
    const [m, h, dom, mon, dow] = preset.split(" ");
    setMinute(m);
    setHour(h);
    setDayOfMonth(dom);
    setMonth(mon);
    setDayOfWeek(dow);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cron Expression Builder</h1>
        <p className="text-muted-foreground">
          Build cron schedules with an intuitive visual interface
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cron Expression</CardTitle>
              <CardDescription className="mt-2">
                {getDescription()}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-md font-mono text-lg text-center">
            {cronExpression}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="builder" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <Card>
            <CardHeader>
              <CardTitle>Build Your Schedule</CardTitle>
              <CardDescription>
                Select values for each field. Use * for "every" or enter specific values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minute">Minute (0-59)</Label>
                  <Input
                    id="minute"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    placeholder="* or 0-59"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: * (every), */5 (every 5), 0,15,30,45 (specific)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hour">Hour (0-23)</Label>
                  <Input
                    id="hour"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    placeholder="* or 0-23"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: * (every), */6 (every 6), 9,17 (9 AM and 5 PM)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day">Day of Month (1-31)</Label>
                  <Input
                    id="day"
                    value={dayOfMonth}
                    onChange={(e) => setDayOfMonth(e.target.value)}
                    placeholder="* or 1-31"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: * (every), 1 (first), 1,15 (1st and 15th)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="month">Month (1-12)</Label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="*">Every month</SelectItem>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="dow">Day of Week (0-6, 0=Sunday)</Label>
                  <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="*">Every day</SelectItem>
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                      <SelectItem value="6">Saturday</SelectItem>
                      <SelectItem value="1-5">Weekdays (Mon-Fri)</SelectItem>
                      <SelectItem value="0,6">Weekends (Sat-Sun)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
                <h4 className="font-semibold text-sm mb-2">Cron Format</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="font-mono">minute hour day month day-of-week</div>
                  <div>
                    * = every | */n = every n | a,b,c = specific values | a-b = range
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets">
          <Card>
            <CardHeader>
              <CardTitle>Common Schedules</CardTitle>
              <CardDescription>
                Click to use a preset cron expression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => applyPreset(preset.value)}
                    className="p-4 text-left border rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">{preset.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {preset.value}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
