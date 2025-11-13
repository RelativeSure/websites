import { Check, Copy, Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UnitValues {
  px: string;
  em: string;
  rem: string;
  percent: string;
  pt: string;
  cm: string;
  mm: string;
  in: string;
  vh: string;
  vw: string;
  vmin: string;
  vmax: string;
}

export default function CssUnitPage() {
  const [baseFontSize, setBaseFontSize] = useState("16");
  const [parentFontSize, setParentFontSize] = useState("16");
  const [viewportWidth, setViewportWidth] = useState("1920");
  const [viewportHeight, setViewportHeight] = useState("1080");
  const [inputValue, setInputValue] = useState("16");
  const [activeUnit, setActiveUnit] = useState<keyof UnitValues>("px");
  const [values, setValues] = useState<UnitValues>({
    px: "16",
    em: "1",
    rem: "1",
    percent: "100",
    pt: "12",
    cm: "0.42",
    mm: "4.23",
    in: "0.17",
    vh: "1.48",
    vw: "0.83",
    vmin: "1.48",
    vmax: "0.83",
  });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    convertUnits(parseFloat(inputValue), activeUnit);
  }, [inputValue, activeUnit, baseFontSize, parentFontSize, viewportWidth, viewportHeight]);

  const convertUnits = (value: number, from: keyof UnitValues) => {
    if (isNaN(value)) return;

    const base = parseFloat(baseFontSize);
    const parent = parseFloat(parentFontSize);
    const vw = parseFloat(viewportWidth);
    const vh = parseFloat(viewportHeight);

    // First convert to px
    let px = 0;
    switch (from) {
      case "px":
        px = value;
        break;
      case "em":
        px = value * parent;
        break;
      case "rem":
        px = value * base;
        break;
      case "percent":
        px = (value / 100) * parent;
        break;
      case "pt":
        px = value * (4 / 3); // 1pt = 4/3px
        break;
      case "cm":
        px = value * 37.8; // 1cm = 37.8px at 96 DPI
        break;
      case "mm":
        px = value * 3.78; // 1mm = 3.78px at 96 DPI
        break;
      case "in":
        px = value * 96; // 1in = 96px
        break;
      case "vh":
        px = (value / 100) * vh;
        break;
      case "vw":
        px = (value / 100) * vw;
        break;
      case "vmin":
        px = (value / 100) * Math.min(vw, vh);
        break;
      case "vmax":
        px = (value / 100) * Math.max(vw, vh);
        break;
    }

    // Convert px to all other units
    setValues({
      px: px.toFixed(2),
      em: (px / parent).toFixed(4),
      rem: (px / base).toFixed(4),
      percent: ((px / parent) * 100).toFixed(2),
      pt: (px * (3 / 4)).toFixed(2),
      cm: (px / 37.8).toFixed(4),
      mm: (px / 3.78).toFixed(3),
      in: (px / 96).toFixed(4),
      vh: ((px / vh) * 100).toFixed(2),
      vw: ((px / vw) * 100).toFixed(2),
      vmin: ((px / Math.min(vw, vh)) * 100).toFixed(2),
      vmax: ((px / Math.max(vw, vh)) * 100).toFixed(2),
    });
  };

  const handleCopy = async (unit: string, value: string) => {
    try {
      await navigator.clipboard.writeText(`${value}${unit}`);
      setCopied(unit);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const units: { key: keyof UnitValues; name: string; desc: string; category: string }[] = [
    { key: "px", name: "Pixels", desc: "Absolute unit", category: "Absolute" },
    { key: "em", name: "Em", desc: "Relative to parent font size", category: "Relative" },
    { key: "rem", name: "Rem", desc: "Relative to root font size", category: "Relative" },
    { key: "percent", name: "Percent", desc: "Relative to parent", category: "Relative" },
    { key: "pt", name: "Points", desc: "1pt = 1/72 inch", category: "Absolute" },
    { key: "cm", name: "Centimeters", desc: "Metric", category: "Absolute" },
    { key: "mm", name: "Millimeters", desc: "Metric", category: "Absolute" },
    { key: "in", name: "Inches", desc: "Imperial", category: "Absolute" },
    { key: "vh", name: "Viewport Height", desc: "% of viewport height", category: "Viewport" },
    { key: "vw", name: "Viewport Width", desc: "% of viewport width", category: "Viewport" },
    { key: "vmin", name: "Viewport Min", desc: "% of smaller dimension", category: "Viewport" },
    { key: "vmax", name: "Viewport Max", desc: "% of larger dimension", category: "Viewport" },
  ];

  const categories = Array.from(new Set(units.map((u) => u.category)));

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">CSS Unit Converter</h1>
        <p className="text-muted-foreground">Convert between CSS length units (px, em, rem, vh, vw, and more)</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Input Value
          </CardTitle>
          <CardDescription>Enter a value and select its unit to see conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-value">Value</Label>
              <Input
                id="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-2xl font-bold"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-unit">Unit</Label>
              <div className="grid grid-cols-4 gap-2">
                {units.slice(0, 8).map((unit) => (
                  <Button
                    key={unit.key}
                    variant={activeUnit === unit.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveUnit(unit.key)}
                    className="font-mono"
                  >
                    {unit.key === "percent" ? "%" : unit.key}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {units.slice(8).map((unit) => (
                  <Button
                    key={unit.key}
                    variant={activeUnit === unit.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveUnit(unit.key)}
                    className="font-mono"
                  >
                    {unit.key}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Context Settings</CardTitle>
          <CardDescription>These values affect relative and viewport unit calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base-font">Root Font Size (px)</Label>
              <Input
                id="base-font"
                type="number"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parent-font">Parent Font Size (px)</Label>
              <Input
                id="parent-font"
                type="number"
                value={parentFontSize}
                onChange={(e) => setParentFontSize(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vw">Viewport Width (px)</Label>
              <Input id="vw" type="number" value={viewportWidth} onChange={(e) => setViewportWidth(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vh">Viewport Height (px)</Label>
              <Input id="vh" type="number" value={viewportHeight} onChange={(e) => setViewportHeight(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => (
        <Card key={category} className="mb-6">
          <CardHeader>
            <CardTitle>{category} Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {units
                .filter((u) => u.category === category)
                .map((unit) => (
                  <div key={unit.key} className="p-4 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{unit.name}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(unit.key === "percent" ? "%" : unit.key, values[unit.key])}
                      >
                        {copied === (unit.key === "percent" ? "%" : unit.key) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="text-2xl font-bold font-mono mb-1">
                      {values[unit.key]}
                      {unit.key === "percent" ? "%" : unit.key}
                    </div>
                    <div className="text-xs text-muted-foreground">{unit.desc}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>CSS Unit Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong>Absolute Units:</strong> Fixed sizes that don't change based on context
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>px: Most common, 1px = 1/96 inch on screen</li>
              <li>pt: Points, used in print (1pt = 1/72 inch)</li>
            </ul>
          </div>
          <div>
            <strong>Relative Units:</strong> Scale based on font sizes
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>em: Relative to parent element's font size</li>
              <li>rem: Relative to root element's font size (usually 16px)</li>
              <li>%: Percentage of parent element</li>
            </ul>
          </div>
          <div>
            <strong>Viewport Units:</strong> Relative to viewport dimensions
            <ul className="list-disc list-inside mt-1 ml-2">
              <li>vh: 1% of viewport height</li>
              <li>vw: 1% of viewport width</li>
              <li>vmin: 1% of smaller dimension</li>
              <li>vmax: 1% of larger dimension</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
