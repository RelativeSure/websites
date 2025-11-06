import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
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

type Color = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
};

export default function ColorConverter() {
  const [color, setColor] = useState<Color>({
    hex: "#3b82f6",
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 },
  });
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const updateFromHex = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({ hex, rgb, hsl });
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    setColor({ hex, rgb: { r, g, b }, hsl });
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl: { h, s, l } });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Color Converter</h1>
        <p className="text-muted-foreground">
          Convert between HEX, RGB, and HSL color formats
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Color Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="w-full h-32 rounded-md border-2 border-border"
            style={{ backgroundColor: color.hex }}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>HEX</CardTitle>
            <CardDescription>Hexadecimal color code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={color.hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="font-mono flex-1"
                placeholder="#000000"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(color.hex, "hex")}
              >
                {copied === "hex" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RGB</CardTitle>
            <CardDescription>Red, Green, Blue (0-255)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="r">R</Label>
                <Input
                  id="r"
                  type="number"
                  min="0"
                  max="255"
                  value={color.rgb.r}
                  onChange={(e) =>
                    updateFromRgb(
                      parseInt(e.target.value) || 0,
                      color.rgb.g,
                      color.rgb.b
                    )
                  }
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="g">G</Label>
                <Input
                  id="g"
                  type="number"
                  min="0"
                  max="255"
                  value={color.rgb.g}
                  onChange={(e) =>
                    updateFromRgb(
                      color.rgb.r,
                      parseInt(e.target.value) || 0,
                      color.rgb.b
                    )
                  }
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b">B</Label>
                <Input
                  id="b"
                  type="number"
                  min="0"
                  max="255"
                  value={color.rgb.b}
                  onChange={(e) =>
                    updateFromRgb(
                      color.rgb.r,
                      color.rgb.g,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                value={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
                readOnly
                className="font-mono flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  copyToClipboard(
                    `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                    "rgb"
                  )
                }
              >
                {copied === "rgb" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HSL</CardTitle>
            <CardDescription>Hue (0-360), Saturation (0-100), Lightness (0-100)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="h">H</Label>
                <Input
                  id="h"
                  type="number"
                  min="0"
                  max="360"
                  value={color.hsl.h}
                  onChange={(e) =>
                    updateFromHsl(
                      parseInt(e.target.value) || 0,
                      color.hsl.s,
                      color.hsl.l
                    )
                  }
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s">S</Label>
                <Input
                  id="s"
                  type="number"
                  min="0"
                  max="100"
                  value={color.hsl.s}
                  onChange={(e) =>
                    updateFromHsl(
                      color.hsl.h,
                      parseInt(e.target.value) || 0,
                      color.hsl.l
                    )
                  }
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="l">L</Label>
                <Input
                  id="l"
                  type="number"
                  min="0"
                  max="100"
                  value={color.hsl.l}
                  onChange={(e) =>
                    updateFromHsl(
                      color.hsl.h,
                      color.hsl.s,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                value={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
                readOnly
                className="font-mono flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  copyToClipboard(
                    `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
                    "hsl"
                  )
                }
              >
                {copied === "hsl" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
