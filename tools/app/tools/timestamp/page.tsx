"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowRightLeft } from "lucide-react";
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
  const [timestamp, setTimestamp] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    try {
      setError("");
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        setError("Invalid timestamp");
        return;
      }
      // Handle both seconds and milliseconds
      const date = new Date(ts > 10000000000 ? ts : ts * 1000);
      setDateTime(date.toISOString().slice(0, 16));
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const dateToTimestamp = () => {
    try {
      setError("");
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        setError("Invalid date");
        return;
      }
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const useCurrentTime = () => {
    setTimestamp(Math.floor(currentTime / 1000).toString());
    setDateTime(new Date(currentTime).toISOString().slice(0, 16));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Convert between Unix timestamps and human-readable dates
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Unix Timestamp</Label>
              <div className="font-mono text-2xl font-bold">
                {Math.floor(currentTime / 1000)}
              </div>
            </div>
            <div>
              <Label>Date & Time</Label>
              <div className="text-2xl font-bold">
                {new Date(currentTime).toLocaleString()}
              </div>
            </div>
          </div>
          <Button onClick={useCurrentTime} variant="outline" className="w-full">
            <Clock className="mr-2 w-4 h-4" />
            Use Current Time
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Unix Timestamp</CardTitle>
            <CardDescription>Seconds since January 1, 1970</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Timestamp</Label>
              <Input
                type="number"
                placeholder="1234567890"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button onClick={timestampToDate} className="w-full">
              <ArrowRightLeft className="mr-2 w-4 h-4" />
              Convert to Date
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date & Time</CardTitle>
            <CardDescription>Human-readable date and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
            <Button onClick={dateToTimestamp} className="w-full">
              <ArrowRightLeft className="mr-2 w-4 h-4" />
              Convert to Timestamp
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
