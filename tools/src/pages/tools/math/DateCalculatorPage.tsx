import { Calendar, Clock, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DateCalculatorPage() {
  // Duration between dates
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [includeTime1, setIncludeTime1] = useState(false);
  const [time1, setTime1] = useState("00:00");
  const [includeTime2, setIncludeTime2] = useState(false);
  const [time2, setTime2] = useState("00:00");

  // Add/Subtract
  const [baseDate, setBaseDate] = useState("");
  const [amount, setAmount] = useState("1");
  const [unit, setUnit] = useState("days");
  const [operation, setOperation] = useState("add");

  const calculateDuration = () => {
    if (!date1 || !date2) return null;

    const d1 = includeTime1 ? new Date(`${date1}T${time1}`) : new Date(date1);
    const d2 = includeTime2 ? new Date(`${date2}T${time2}`) : new Date(date2);

    const diffMs = Math.abs(d2.getTime() - d1.getTime());

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);

    return {
      totalDays: days,
      totalHours: Math.floor(diffMs / (1000 * 60 * 60)),
      totalMinutes: Math.floor(diffMs / (1000 * 60)),
      totalSeconds: Math.floor(diffMs / 1000),
      breakdown: { days, hours, minutes, seconds },
      weeks,
      months,
      years,
    };
  };

  const calculateAddSubtract = () => {
    if (!baseDate) return null;

    const date = new Date(baseDate);
    const num = parseInt(amount, 10) || 0;
    const multiplier = operation === "add" ? 1 : -1;

    const result = new Date(date);

    switch (unit) {
      case "years":
        result.setFullYear(result.getFullYear() + num * multiplier);
        break;
      case "months":
        result.setMonth(result.getMonth() + num * multiplier);
        break;
      case "weeks":
        result.setDate(result.getDate() + num * multiplier * 7);
        break;
      case "days":
        result.setDate(result.getDate() + num * multiplier);
        break;
      case "hours":
        result.setHours(result.getHours() + num * multiplier);
        break;
      case "minutes":
        result.setMinutes(result.getMinutes() + num * multiplier);
        break;
    }

    return result;
  };

  const duration = calculateDuration();
  const modifiedDate = calculateAddSubtract();

  const setToNow = (setter: (val: string) => void) => {
    const now = new Date();
    setter(now.toISOString().split("T")[0]);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Date Calculator</h1>
        <p className="text-muted-foreground">Calculate duration between dates or add/subtract time</p>
      </div>

      <Tabs defaultValue="duration">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="duration">
            <Clock className="h-4 w-4 mr-2" />
            Duration
          </TabsTrigger>
          <TabsTrigger value="modify">
            <Calendar className="h-4 w-4 mr-2" />
            Add/Subtract
          </TabsTrigger>
        </TabsList>

        <TabsContent value="duration">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calculate Duration Between Dates</CardTitle>
              <CardDescription>Find the time difference between two dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date1">Start Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="date1"
                        type="date"
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" onClick={() => setToNow(setDate1)}>
                        Today
                      </Button>
                    </div>
                  </div>
                  {includeTime1 && (
                    <div className="space-y-2">
                      <Label htmlFor="time1">Time</Label>
                      <Input id="time1" type="time" value={time1} onChange={(e) => setTime1(e.target.value)} />
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIncludeTime1(!includeTime1)}>
                    {includeTime1 ? "Remove" : "Add"} Time
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date2">End Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="date2"
                        type="date"
                        value={date2}
                        onChange={(e) => setDate2(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" onClick={() => setToNow(setDate2)}>
                        Today
                      </Button>
                    </div>
                  </div>
                  {includeTime2 && (
                    <div className="space-y-2">
                      <Label htmlFor="time2">Time</Label>
                      <Input id="time2" type="time" value={time2} onChange={(e) => setTime2(e.target.value)} />
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setIncludeTime2(!includeTime2)}>
                    {includeTime2 ? "Remove" : "Add"} Time
                  </Button>
                </div>
              </div>

              {duration && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-primary/10 rounded-md text-center">
                      <div className="text-3xl font-bold text-primary">{duration.breakdown.days}</div>
                      <div className="text-sm text-muted-foreground">Days</div>
                    </div>
                    <div className="p-4 bg-muted rounded-md text-center">
                      <div className="text-3xl font-bold">{duration.breakdown.hours}</div>
                      <div className="text-sm text-muted-foreground">Hours</div>
                    </div>
                    <div className="p-4 bg-muted rounded-md text-center">
                      <div className="text-3xl font-bold">{duration.breakdown.minutes}</div>
                      <div className="text-sm text-muted-foreground">Minutes</div>
                    </div>
                    <div className="p-4 bg-muted rounded-md text-center">
                      <div className="text-3xl font-bold">{duration.breakdown.seconds}</div>
                      <div className="text-sm text-muted-foreground">Seconds</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="p-3 border rounded">
                      <strong>{duration.years.toLocaleString()}</strong> years
                    </div>
                    <div className="p-3 border rounded">
                      <strong>{duration.months.toLocaleString()}</strong> months
                    </div>
                    <div className="p-3 border rounded">
                      <strong>{duration.weeks.toLocaleString()}</strong> weeks
                    </div>
                    <div className="p-3 border rounded">
                      <strong>{duration.totalHours.toLocaleString()}</strong> hours
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modify">
          <Card>
            <CardHeader>
              <CardTitle>Add or Subtract Time</CardTitle>
              <CardDescription>Calculate a new date by adding or subtracting time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-date">Starting Date</Label>
                  <div className="flex gap-2">
                    <Input
                      id="base-date"
                      type="date"
                      value={baseDate}
                      onChange={(e) => setBaseDate(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm" onClick={() => setToNow(setBaseDate)}>
                      Today
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Operation</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={operation === "add" ? "default" : "outline"}
                      onClick={() => setOperation("add")}
                      className="flex-1"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button
                      variant={operation === "subtract" ? "default" : "outline"}
                      onClick={() => setOperation("subtract")}
                      className="flex-1"
                    >
                      <Minus className="h-4 w-4 mr-1" />
                      Subtract
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {modifiedDate && (
                <div className="p-6 bg-primary/10 border-2 border-primary rounded-md text-center">
                  <div className="text-sm text-muted-foreground mb-2">Result</div>
                  <div className="text-4xl font-bold text-primary mb-2">{modifiedDate.toLocaleDateString()}</div>
                  <div className="text-lg text-muted-foreground">{modifiedDate.toLocaleTimeString()}</div>
                  <div className="text-sm text-muted-foreground mt-2">{modifiedDate.toISOString()}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
