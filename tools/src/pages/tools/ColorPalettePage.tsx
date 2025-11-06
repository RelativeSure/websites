import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCw, Copy, Check } from "lucide-react";

export default function ColorPalettePage() {
  const [palettes, setPalettes] = useState<string[][]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generateRandomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60 + Math.floor(Math.random() * 30);
    const lightness = 45 + Math.floor(Math.random() * 30);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const hslToHex = (hsl: string): string => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return "#000000";

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generateMonochrome = (baseColor: string): string[] => {
    const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return [];

    const hue = parseInt(match[1]);
    const sat = parseInt(match[2]);

    return [
      `hsl(${hue}, ${sat}%, 20%)`,
      `hsl(${hue}, ${sat}%, 35%)`,
      `hsl(${hue}, ${sat}%, 50%)`,
      `hsl(${hue}, ${sat}%, 65%)`,
      `hsl(${hue}, ${sat}%, 80%)`,
    ];
  };

  const generateAnalogous = (baseColor: string): string[] => {
    const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return [];

    const hue = parseInt(match[1]);
    const sat = parseInt(match[2]);
    const light = parseInt(match[3]);

    return [
      `hsl(${(hue - 30 + 360) % 360}, ${sat}%, ${light}%)`,
      `hsl(${(hue - 15 + 360) % 360}, ${sat}%, ${light}%)`,
      baseColor,
      `hsl(${(hue + 15) % 360}, ${sat}%, ${light}%)`,
      `hsl(${(hue + 30) % 360}, ${sat}%, ${light}%)`,
    ];
  };

  const generateComplementary = (baseColor: string): string[] => {
    const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return [];

    const hue = parseInt(match[1]);
    const sat = parseInt(match[2]);
    const light = parseInt(match[3]);

    return [
      baseColor,
      `hsl(${(hue + 180) % 360}, ${sat}%, ${light}%)`,
      `hsl(${hue}, ${sat * 0.7}%, ${light * 0.8}%)`,
      `hsl(${(hue + 180) % 360}, ${sat * 0.7}%, ${light * 0.8}%)`,
      `hsl(${hue}, ${sat * 0.5}%, ${light * 1.2}%)`,
    ];
  };

  const generateTriadic = (baseColor: string): string[] => {
    const match = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return [];

    const hue = parseInt(match[1]);
    const sat = parseInt(match[2]);
    const light = parseInt(match[3]);

    return [
      baseColor,
      `hsl(${(hue + 120) % 360}, ${sat}%, ${light}%)`,
      `hsl(${(hue + 240) % 360}, ${sat}%, ${light}%)`,
      `hsl(${hue}, ${sat * 0.6}%, ${light * 1.1}%)`,
      `hsl(${(hue + 120) % 360}, ${sat * 0.6}%, ${light * 1.1}%)`,
    ];
  };

  const generatePalettes = () => {
    const baseColor = generateRandomColor();
    setPalettes([
      generateMonochrome(baseColor),
      generateAnalogous(baseColor),
      generateComplementary(baseColor),
      generateTriadic(baseColor),
    ]);
  };

  const copyColor = async (color: string, index: number) => {
    try {
      const hex = hslToHex(color);
      await navigator.clipboard.writeText(hex);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const paletteNames = ["Monochrome", "Analogous", "Complementary", "Triadic"];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Color Palette Generator</h1>
        <p className="text-muted-foreground">
          Generate beautiful color palettes instantly
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Palettes</CardTitle>
          <CardDescription>
            Click to generate color schemes based on color theory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generatePalettes} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate New Palettes
          </Button>
        </CardContent>
      </Card>

      {palettes.length > 0 && (
        <div className="space-y-6">
          {palettes.map((palette, paletteIndex) => (
            <Card key={paletteIndex}>
              <CardHeader>
                <CardTitle>{paletteNames[paletteIndex]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {palette.map((color, colorIndex) => {
                    const globalIndex = paletteIndex * 5 + colorIndex;
                    const hex = hslToHex(color);
                    return (
                      <div key={colorIndex} className="space-y-2">
                        <div
                          className="h-24 rounded-md cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color, globalIndex)}
                        />
                        <div className="text-center">
                          <div className="text-xs font-mono">{hex}</div>
                          {copied === globalIndex && (
                            <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                              <Check className="h-3 w-3" />
                              Copied
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {palettes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            Click "Generate New Palettes" to create color schemes
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Color Schemes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div>
            <strong>Monochrome:</strong> Variations of a single hue with different lightness values
          </div>
          <div>
            <strong>Analogous:</strong> Colors adjacent to each other on the color wheel
          </div>
          <div>
            <strong>Complementary:</strong> Colors opposite each other on the color wheel
          </div>
          <div>
            <strong>Triadic:</strong> Three colors evenly spaced around the color wheel
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
