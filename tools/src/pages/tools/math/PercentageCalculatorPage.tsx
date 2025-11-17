import { Calculator, Percent, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PercentageCalculatorPage() {
  // What is X% of Y
  const [percent1, setPercent1] = useState("25");
  const [value1, setValue1] = useState("200");
  const result1 = (parseFloat(percent1) / 100) * parseFloat(value1);

  // X is what % of Y
  const [value2a, setValue2a] = useState("50");
  const [value2b, setValue2b] = useState("200");
  const result2 = (parseFloat(value2a) / parseFloat(value2b)) * 100;

  // Percentage change from X to Y
  const [oldValue, setOldValue] = useState("100");
  const [newValue, setNewValue] = useState("150");
  const change = parseFloat(newValue) - parseFloat(oldValue);
  const percentChange = (change / parseFloat(oldValue)) * 100;
  const isIncrease = change >= 0;

  // Increase/Decrease X by Y%
  const [baseValue, setBaseValue] = useState("100");
  const [changePercent, setChangePercent] = useState("10");
  const increaseResult = parseFloat(baseValue) * (1 + parseFloat(changePercent) / 100);
  const decreaseResult = parseFloat(baseValue) * (1 - parseFloat(changePercent) / 100);

  const formatNumber = (num: number): string => {
    if (Number.isNaN(num) || !Number.isFinite(num)) return "—";
    return num.toFixed(2);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Percentage Calculator</h1>
        <p className="text-muted-foreground">Calculate percentages, percentage changes, and more</p>
      </div>

      <Tabs defaultValue="basic" className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">
            <Calculator className="h-4 w-4 mr-2" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="reverse">
            <Percent className="h-4 w-4 mr-2" />
            Reverse
          </TabsTrigger>
          <TabsTrigger value="change">
            <TrendingUp className="h-4 w-4 mr-2" />
            Change
          </TabsTrigger>
          <TabsTrigger value="modify">
            <TrendingDown className="h-4 w-4 mr-2" />
            Modify
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>What is X% of Y?</CardTitle>
              <CardDescription>Calculate a percentage of a given value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="percent1">Percentage (%)</Label>
                    <Input
                      id="percent1"
                      type="number"
                      value={percent1}
                      onChange={(e) => setPercent1(e.target.value)}
                      placeholder="25"
                      className="text-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value1">of Value</Label>
                    <Input
                      id="value1"
                      type="number"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder="200"
                      className="text-xl"
                    />
                  </div>
                </div>

                <div className="p-6 bg-primary/10 border-2 border-primary rounded-md text-center">
                  <div className="text-sm text-muted-foreground mb-2">Result</div>
                  <div className="text-5xl font-bold text-primary">{formatNumber(result1)}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {percent1}% of {value1} equals {formatNumber(result1)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reverse">
          <Card>
            <CardHeader>
              <CardTitle>X is what % of Y?</CardTitle>
              <CardDescription>Find what percentage one number is of another</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value2a">Value</Label>
                    <Input
                      id="value2a"
                      type="number"
                      value={value2a}
                      onChange={(e) => setValue2a(e.target.value)}
                      placeholder="50"
                      className="text-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value2b">is what % of</Label>
                    <Input
                      id="value2b"
                      type="number"
                      value={value2b}
                      onChange={(e) => setValue2b(e.target.value)}
                      placeholder="200"
                      className="text-xl"
                    />
                  </div>
                </div>

                <div className="p-6 bg-primary/10 border-2 border-primary rounded-md text-center">
                  <div className="text-sm text-muted-foreground mb-2">Result</div>
                  <div className="text-5xl font-bold text-primary">{formatNumber(result2)}%</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {value2a} is {formatNumber(result2)}% of {value2b}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Change</CardTitle>
              <CardDescription>Calculate the percentage increase or decrease between two values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="old-value">Old Value</Label>
                    <Input
                      id="old-value"
                      type="number"
                      value={oldValue}
                      onChange={(e) => setOldValue(e.target.value)}
                      placeholder="100"
                      className="text-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-value">New Value</Label>
                    <Input
                      id="new-value"
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="150"
                      className="text-xl"
                    />
                  </div>
                </div>

                <div
                  className={`p-6 border-2 rounded-md text-center ${
                    isIncrease
                      ? "bg-green-50 dark:bg-green-950/30 border-green-500"
                      : "bg-red-50 dark:bg-red-950/30 border-red-500"
                  }`}
                >
                  <div className="text-sm text-muted-foreground mb-2">{isIncrease ? "Increase" : "Decrease"}</div>
                  <div className={`text-5xl font-bold ${isIncrease ? "text-green-600" : "text-red-600"}`}>
                    {isIncrease ? "+" : ""}
                    {formatNumber(percentChange)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Change from {oldValue} to {newValue}
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-sm">
                      Absolute change: {isIncrease ? "+" : ""}
                      {formatNumber(change)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modify">
          <Card>
            <CardHeader>
              <CardTitle>Increase/Decrease by Percentage</CardTitle>
              <CardDescription>Add or subtract a percentage from a value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-value">Base Value</Label>
                    <Input
                      id="base-value"
                      type="number"
                      value={baseValue}
                      onChange={(e) => setBaseValue(e.target.value)}
                      placeholder="100"
                      className="text-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="change-percent">Percentage Change</Label>
                    <Input
                      id="change-percent"
                      type="number"
                      value={changePercent}
                      onChange={(e) => setChangePercent(e.target.value)}
                      placeholder="10"
                      className="text-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-green-50 dark:bg-green-950/30 border-2 border-green-500 rounded-md text-center">
                    <div className="text-sm text-muted-foreground mb-2">Increase by {changePercent}%</div>
                    <div className="text-4xl font-bold text-green-600">{formatNumber(increaseResult)}</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      +{formatNumber(increaseResult - parseFloat(baseValue))}
                    </div>
                  </div>

                  <div className="p-6 bg-red-50 dark:bg-red-950/30 border-2 border-red-500 rounded-md text-center">
                    <div className="text-sm text-muted-foreground mb-2">Decrease by {changePercent}%</div>
                    <div className="text-4xl font-bold text-red-600">{formatNumber(decreaseResult)}</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      -{formatNumber(parseFloat(baseValue) - decreaseResult)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Percentage Formulas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Basic Percentage</h4>
            <code className="block p-2 bg-muted rounded mb-1">(Percentage / 100) × Value</code>
            <p className="text-muted-foreground text-xs">Example: 25% of 200 = (25/100) × 200 = 50</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Reverse Percentage</h4>
            <code className="block p-2 bg-muted rounded mb-1">(Value / Total) × 100</code>
            <p className="text-muted-foreground text-xs">Example: 50 is what % of 200? = (50/200) × 100 = 25%</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Percentage Change</h4>
            <code className="block p-2 bg-muted rounded mb-1">((New - Old) / Old) × 100</code>
            <p className="text-muted-foreground text-xs">Example: 100 to 150 = ((150-100)/100) × 100 = 50% increase</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Apply Percentage</h4>
            <code className="block p-2 bg-muted rounded mb-1">Value × (1 ± Percentage/100)</code>
            <p className="text-muted-foreground text-xs">Example: 100 + 10% = 100 × (1 + 10/100) = 110</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
