import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CronParser() {
  const [cron, setCron] = useState("*/5 * * * *");
  const [description, setDescription] = useState("");
  const [parts, setParts] = useState<{ minute: string; hour: string; day: string; month: string; weekday: string } | null>(null);

  const parseCron = (cronExpr: string) => {
    setCron(cronExpr);

    const parts = cronExpr.trim().split(/\s+/);
    if (parts.length !== 5) {
      setDescription("Invalid cron expression (must have 5 parts)");
      setParts(null);
      return;
    }

    const [minute, hour, day, month, weekday] = parts;

    setParts({ minute, hour, day, month, weekday });

    const desc: string[] = [];

    // Minute
    if (minute === "*") desc.push("every minute");
    else if (minute.startsWith("*/")) desc.push(`every ${minute.slice(2)} minutes`);
    else desc.push(`at minute ${minute}`);

    // Hour
    if (hour === "*") desc.push("of every hour");
    else if (hour.startsWith("*/")) desc.push(`every ${hour.slice(2)} hours`);
    else desc.push(`at hour ${hour}`);

    // Day
    if (day !== "*") {
      if (day.startsWith("*/")) desc.push(`every ${day.slice(2)} days`);
      else desc.push(`on day ${day} of the month`);
    }

    // Month
    if (month !== "*") {
      const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (month.startsWith("*/")) desc.push(`every ${month.slice(2)} months`);
      else desc.push(`in ${months[parseInt(month)] || month}`);
    }

    // Weekday
    if (weekday !== "*") {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      if (weekday.includes(",")) {
        const dayNums = weekday.split(",").map(d => days[parseInt(d)] || d);
        desc.push(`on ${dayNums.join(", ")}`);
      } else {
        desc.push(`on ${days[parseInt(weekday)] || weekday}`);
      }
    }

    setDescription("Runs " + desc.join(" "));
  };

  const examples = [
    { cron: "* * * * *", desc: "Every minute" },
    { cron: "*/5 * * * *", desc: "Every 5 minutes" },
    { cron: "0 * * * *", desc: "Every hour" },
    { cron: "0 0 * * *", desc: "Daily at midnight" },
    { cron: "0 9 * * *", desc: "Daily at 9 AM" },
    { cron: "0 0 * * 0", desc: "Weekly on Sunday at midnight" },
    { cron: "0 0 1 * *", desc: "Monthly on 1st at midnight" },
    { cron: "0 0 1 1 *", desc: "Yearly on Jan 1st at midnight" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Cron Expression Parser</h1>
        <p className="text-muted-foreground">
          Parse and understand cron expressions
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cron Expression</CardTitle>
          <CardDescription>Enter a cron expression to parse (minute hour day month weekday)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cron">Cron Expression</Label>
            <Input
              id="cron"
              value={cron}
              onChange={(e) => parseCron(e.target.value)}
              placeholder="*/5 * * * *"
              className="font-mono text-lg"
            />
          </div>

          {description && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
              <p className="text-lg font-semibold">{description}</p>
            </div>
          )}

          {parts && (
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">Minute</Label>
                <div className="p-2 bg-muted rounded font-mono text-center">{parts.minute}</div>
                <p className="text-xs text-muted-foreground text-center">0-59</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Hour</Label>
                <div className="p-2 bg-muted rounded font-mono text-center">{parts.hour}</div>
                <p className="text-xs text-muted-foreground text-center">0-23</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Day</Label>
                <div className="p-2 bg-muted rounded font-mono text-center">{parts.day}</div>
                <p className="text-xs text-muted-foreground text-center">1-31</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Month</Label>
                <div className="p-2 bg-muted rounded font-mono text-center">{parts.month}</div>
                <p className="text-xs text-muted-foreground text-center">1-12</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Weekday</Label>
                <div className="p-2 bg-muted rounded font-mono text-center">{parts.weekday}</div>
                <p className="text-xs text-muted-foreground text-center">0-6</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Examples</CardTitle>
          <CardDescription>Click to try these common cron expressions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {examples.map((example, i) => (
              <button
                key={i}
                onClick={() => parseCron(example.cron)}
                className="w-full text-left p-3 rounded-md border border-border hover:bg-muted transition-colors"
              >
                <div className="font-mono text-sm text-primary">{example.cron}</div>
                <div className="text-sm text-muted-foreground">{example.desc}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
