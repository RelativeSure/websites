import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const properties = [
  // Layout
  { property: "display", values: "block | inline | flex | grid | none", description: "Display type of element", category: "Layout" },
  { property: "position", values: "static | relative | absolute | fixed | sticky", description: "Positioning method", category: "Layout" },
  { property: "top", values: "<length> | <percentage> | auto", description: "Top position offset", category: "Layout" },
  { property: "right", values: "<length> | <percentage> | auto", description: "Right position offset", category: "Layout" },
  { property: "bottom", values: "<length> | <percentage> | auto", description: "Bottom position offset", category: "Layout" },
  { property: "left", values: "<length> | <percentage> | auto", description: "Left position offset", category: "Layout" },
  { property: "z-index", values: "<integer> | auto", description: "Stack order", category: "Layout" },
  { property: "float", values: "left | right | none", description: "Float direction", category: "Layout" },
  { property: "clear", values: "left | right | both | none", description: "Clear floats", category: "Layout" },
  { property: "overflow", values: "visible | hidden | scroll | auto", description: "Overflow behavior", category: "Layout" },

  // Flexbox
  { property: "flex-direction", values: "row | column | row-reverse | column-reverse", description: "Flex direction", category: "Flexbox" },
  { property: "justify-content", values: "flex-start | center | space-between | space-around", description: "Main axis alignment", category: "Flexbox" },
  { property: "align-items", values: "stretch | flex-start | center | flex-end", description: "Cross axis alignment", category: "Flexbox" },
  { property: "align-content", values: "stretch | flex-start | center | space-between", description: "Multi-line alignment", category: "Flexbox" },
  { property: "flex-wrap", values: "nowrap | wrap | wrap-reverse", description: "Wrap behavior", category: "Flexbox" },
  { property: "flex", values: "<grow> <shrink> <basis>", description: "Flex shorthand", category: "Flexbox" },
  { property: "flex-grow", values: "<number>", description: "Grow factor", category: "Flexbox" },
  { property: "flex-shrink", values: "<number>", description: "Shrink factor", category: "Flexbox" },
  { property: "flex-basis", values: "<length> | auto", description: "Base size", category: "Flexbox" },

  // Grid
  { property: "grid-template-columns", values: "<track-list>", description: "Define grid columns", category: "Grid" },
  { property: "grid-template-rows", values: "<track-list>", description: "Define grid rows", category: "Grid" },
  { property: "grid-gap", values: "<length>", description: "Gap between grid items", category: "Grid" },
  { property: "grid-column", values: "<start> / <end>", description: "Column span", category: "Grid" },
  { property: "grid-row", values: "<start> / <end>", description: "Row span", category: "Grid" },
  { property: "grid-auto-flow", values: "row | column | dense", description: "Auto-placement algorithm", category: "Grid" },

  // Box Model
  { property: "width", values: "<length> | <percentage> | auto", description: "Element width", category: "Box Model" },
  { property: "height", values: "<length> | <percentage> | auto", description: "Element height", category: "Box Model" },
  { property: "max-width", values: "<length> | <percentage> | none", description: "Maximum width", category: "Box Model" },
  { property: "min-width", values: "<length> | <percentage>", description: "Minimum width", category: "Box Model" },
  { property: "max-height", values: "<length> | <percentage> | none", description: "Maximum height", category: "Box Model" },
  { property: "min-height", values: "<length> | <percentage>", description: "Minimum height", category: "Box Model" },
  { property: "margin", values: "<length> | auto", description: "Outer spacing", category: "Box Model" },
  { property: "padding", values: "<length>", description: "Inner spacing", category: "Box Model" },
  { property: "box-sizing", values: "content-box | border-box", description: "Box size calculation", category: "Box Model" },

  // Typography
  { property: "color", values: "<color>", description: "Text color", category: "Typography" },
  { property: "font-family", values: "<family-name>", description: "Font family", category: "Typography" },
  { property: "font-size", values: "<length> | <percentage>", description: "Font size", category: "Typography" },
  { property: "font-weight", values: "normal | bold | 100-900", description: "Font weight", category: "Typography" },
  { property: "font-style", values: "normal | italic | oblique", description: "Font style", category: "Typography" },
  { property: "text-align", values: "left | right | center | justify", description: "Text alignment", category: "Typography" },
  { property: "text-decoration", values: "none | underline | line-through", description: "Text decoration", category: "Typography" },
  { property: "text-transform", values: "none | uppercase | lowercase | capitalize", description: "Text transformation", category: "Typography" },
  { property: "line-height", values: "<number> | <length>", description: "Line height", category: "Typography" },
  { property: "letter-spacing", values: "<length>", description: "Space between letters", category: "Typography" },
  { property: "word-spacing", values: "<length>", description: "Space between words", category: "Typography" },

  // Background
  { property: "background-color", values: "<color>", description: "Background color", category: "Background" },
  { property: "background-image", values: "url() | none", description: "Background image", category: "Background" },
  { property: "background-size", values: "cover | contain | <length>", description: "Background size", category: "Background" },
  { property: "background-position", values: "top | center | bottom | <percentage>", description: "Background position", category: "Background" },
  { property: "background-repeat", values: "repeat | no-repeat | repeat-x | repeat-y", description: "Background repeat", category: "Background" },

  // Border
  { property: "border", values: "<width> <style> <color>", description: "Border shorthand", category: "Border" },
  { property: "border-width", values: "<length>", description: "Border width", category: "Border" },
  { property: "border-style", values: "solid | dashed | dotted | none", description: "Border style", category: "Border" },
  { property: "border-color", values: "<color>", description: "Border color", category: "Border" },
  { property: "border-radius", values: "<length> | <percentage>", description: "Border radius", category: "Border" },

  // Effects
  { property: "opacity", values: "0-1", description: "Element opacity", category: "Effects" },
  { property: "box-shadow", values: "<offset-x> <offset-y> <blur> <color>", description: "Box shadow", category: "Effects" },
  { property: "text-shadow", values: "<offset-x> <offset-y> <blur> <color>", description: "Text shadow", category: "Effects" },
  { property: "filter", values: "blur() | brightness() | contrast()", description: "Visual filters", category: "Effects" },
  { property: "transform", values: "rotate() | scale() | translate()", description: "2D/3D transformations", category: "Effects" },

  // Animation
  { property: "transition", values: "<property> <duration> <timing>", description: "Transition shorthand", category: "Animation" },
  { property: "animation", values: "<name> <duration> <timing>", description: "Animation shorthand", category: "Animation" },
  { property: "animation-name", values: "<keyframe-name>", description: "Animation name", category: "Animation" },
  { property: "animation-duration", values: "<time>", description: "Animation duration", category: "Animation" },
  { property: "animation-timing-function", values: "ease | linear | ease-in | ease-out", description: "Animation timing", category: "Animation" },
];

export default function CssPropertiesPage() {
  const [search, setSearch] = useState("");

  const filtered = properties.filter(
    (p) =>
      p.property.toLowerCase().includes(search.toLowerCase()) ||
      p.values.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(properties.map((p) => p.category)));

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">CSS Properties Reference</h1>
        <p className="text-muted-foreground">
          Common CSS properties and values
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find CSS properties by name or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((p) => p.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Property</th>
                      <th className="p-2 text-left">Values</th>
                      <th className="p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className="p-2 font-mono font-semibold text-primary">
                          {item.property}
                        </td>
                        <td className="p-2 font-mono text-xs text-muted-foreground">
                          {item.values}
                        </td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No properties found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
