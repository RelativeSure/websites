import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UnitConverterPage() {
  const [lengthValue, setLengthValue] = useState("1");
  const [lengthFrom, setLengthFrom] = useState("m");
  const [lengthTo, setLengthTo] = useState("ft");

  const [weightValue, setWeightValue] = useState("1");
  const [weightFrom, setWeightFrom] = useState("kg");
  const [weightTo, setWeightTo] = useState("lb");

  const [tempValue, setTempValue] = useState("0");
  const [tempFrom, setTempFrom] = useState("c");
  const [tempTo, setTempTo] = useState("f");

  // Length conversions (to meters)
  const lengthUnits: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34,
  };

  // Weight conversions (to kg)
  const weightUnits: Record<string, number> = {
    mg: 0.000001,
    g: 0.001,
    kg: 1,
    t: 1000,
    oz: 0.0283495,
    lb: 0.453592,
    st: 6.35029,
  };

  const convertLength = (): string => {
    const val = parseFloat(lengthValue);
    if (Number.isNaN(val)) return "Invalid input";
    const meters = val * lengthUnits[lengthFrom];
    const result = meters / lengthUnits[lengthTo];
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const convertWeight = (): string => {
    const val = parseFloat(weightValue);
    if (Number.isNaN(val)) return "Invalid input";
    const kg = val * weightUnits[weightFrom];
    const result = kg / weightUnits[weightTo];
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const convertTemp = (): string => {
    const val = parseFloat(tempValue);
    if (Number.isNaN(val)) return "Invalid input";

    let celsius: number;
    if (tempFrom === "c") celsius = val;
    else if (tempFrom === "f") celsius = ((val - 32) * 5) / 9;
    else celsius = val - 273.15; // kelvin

    let result: number;
    if (tempTo === "c") result = celsius;
    else if (tempTo === "f") result = (celsius * 9) / 5 + 32;
    else result = celsius + 273.15; // kelvin

    return result.toFixed(2);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Unit Converter</h1>
        <p className="text-muted-foreground">Convert between different units of measurement</p>
      </div>

      <Tabs defaultValue="length" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="temp">Temperature</TabsTrigger>
        </TabsList>

        <TabsContent value="length">
          <Card>
            <CardHeader>
              <CardTitle>Length Converter</CardTitle>
              <CardDescription>Convert between length units</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length-value">Value</Label>
                  <Input
                    id="length-value"
                    type="number"
                    value={lengthValue}
                    onChange={(e) => setLengthValue(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length-from">From</Label>
                  <Select value={lengthFrom} onValueChange={setLengthFrom}>
                    <SelectTrigger id="length-from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">Millimeters (mm)</SelectItem>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="m">Meters (m)</SelectItem>
                      <SelectItem value="km">Kilometers (km)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                      <SelectItem value="ft">Feet (ft)</SelectItem>
                      <SelectItem value="yd">Yards (yd)</SelectItem>
                      <SelectItem value="mi">Miles (mi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length-to">To</Label>
                <Select value={lengthTo} onValueChange={setLengthTo}>
                  <SelectTrigger id="length-to">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm">Millimeters (mm)</SelectItem>
                    <SelectItem value="cm">Centimeters (cm)</SelectItem>
                    <SelectItem value="m">Meters (m)</SelectItem>
                    <SelectItem value="km">Kilometers (km)</SelectItem>
                    <SelectItem value="in">Inches (in)</SelectItem>
                    <SelectItem value="ft">Feet (ft)</SelectItem>
                    <SelectItem value="yd">Yards (yd)</SelectItem>
                    <SelectItem value="mi">Miles (mi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold font-mono">{convertLength()}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>Weight Converter</CardTitle>
              <CardDescription>Convert between weight units</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-value">Value</Label>
                  <Input
                    id="weight-value"
                    type="number"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-from">From</Label>
                  <Select value={weightFrom} onValueChange={setWeightFrom}>
                    <SelectTrigger id="weight-from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mg">Milligrams (mg)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="t">Metric Tons (t)</SelectItem>
                      <SelectItem value="oz">Ounces (oz)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                      <SelectItem value="st">Stones (st)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight-to">To</Label>
                <Select value={weightTo} onValueChange={setWeightTo}>
                  <SelectTrigger id="weight-to">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mg">Milligrams (mg)</SelectItem>
                    <SelectItem value="g">Grams (g)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="t">Metric Tons (t)</SelectItem>
                    <SelectItem value="oz">Ounces (oz)</SelectItem>
                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                    <SelectItem value="st">Stones (st)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold font-mono">{convertWeight()}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temp">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Converter</CardTitle>
              <CardDescription>Convert between temperature scales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temp-value">Value</Label>
                  <Input
                    id="temp-value"
                    type="number"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp-from">From</Label>
                  <Select value={tempFrom} onValueChange={setTempFrom}>
                    <SelectTrigger id="temp-from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c">Celsius (°C)</SelectItem>
                      <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                      <SelectItem value="k">Kelvin (K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temp-to">To</Label>
                <Select value={tempTo} onValueChange={setTempTo}>
                  <SelectTrigger id="temp-to">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c">Celsius (°C)</SelectItem>
                    <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                    <SelectItem value="k">Kelvin (K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Result</div>
                <div className="text-2xl font-bold font-mono">{convertTemp()}</div>
              </div>

              <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                <strong>Reference:</strong>
                <div className="mt-2 space-y-1">
                  <div>Water freezes: 0°C = 32°F = 273.15K</div>
                  <div>Water boils: 100°C = 212°F = 373.15K</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
