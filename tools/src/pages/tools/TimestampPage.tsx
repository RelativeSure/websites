import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TimestampConverter() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [timestamp, setTimestamp] = useState("");
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    if (!timestamp) return;

    const ts = parseInt(timestamp);
    if (isNaN(ts)) return;

    // Handle both seconds and milliseconds
    const date = new Date(ts > 10000000000 ? ts : ts * 1000);
    setDatetime(date.toISOString().slice(0, 16));
  };

  const dateToTimestamp = () => {
    if (!datetime) return;

    const date = new Date(datetime);
    if (isNaN(date.getTime())) return;

    setTimestamp(Math.floor(date.getTime() / 1000).toString());
  };

  const useCurrentTime = () => {
    setTimestamp(Math.floor(currentTime / 1000).toString());
    setDatetime(new Date(currentTime).toISOString().slice(0, 16));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Convert between Unix timestamps and dates. Enter one field to calculate the other.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timestamp Converter</CardTitle>
          <CardDescription>Convert between Unix timestamps and human-readable dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Current Time</Label>
              <div className="grid gap-4 md:grid-cols-2 mt-2">
                <div>
                  <Label className="text-xs">Unix Timestamp</Label>
                  <div className="font-mono text-xl font-bold text-primary">
                    {Math.floor(currentTime / 1000)}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Date & Time</Label>
                  <div className="text-lg font-bold">
                    {new Date(currentTime).toLocaleString()}
                  </div>
                </div>
              </div>
              <Button onClick={useCurrentTime} variant="outline" size="sm" className="w-full mt-3">
                <Clock className="mr-2 w-4 h-4" />
                Use Current Time
              </Button>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-2">
            <Label htmlFor="timestamp">Unix Timestamp (seconds since 1970)</Label>
            <div className="flex gap-2">
              <Input
                id="timestamp"
                type="number"
                placeholder="1234567890"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="font-mono flex-1"
              />
              <Button type="button" onClick={timestampToDate}>
                → Date
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center text-muted-foreground">
            <div className="h-px bg-border flex-1" />
            <span className="px-4 text-sm">or</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="datetime">Date & Time</Label>
            <div className="flex gap-2">
              <Input
                id="datetime"
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={dateToTimestamp}>
                → Timestamp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
