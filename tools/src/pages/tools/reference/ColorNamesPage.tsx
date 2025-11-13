import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const colors = [
  // Reds
  { name: "red", hex: "#FF0000", rgb: "rgb(255, 0, 0)", category: "Reds" },
  { name: "crimson", hex: "#DC143C", rgb: "rgb(220, 20, 60)", category: "Reds" },
  { name: "firebrick", hex: "#B22222", rgb: "rgb(178, 34, 34)", category: "Reds" },
  { name: "darkred", hex: "#8B0000", rgb: "rgb(139, 0, 0)", category: "Reds" },
  { name: "indianred", hex: "#CD5C5C", rgb: "rgb(205, 92, 92)", category: "Reds" },
  { name: "lightcoral", hex: "#F08080", rgb: "rgb(240, 128, 128)", category: "Reds" },
  { name: "salmon", hex: "#FA8072", rgb: "rgb(250, 128, 114)", category: "Reds" },
  { name: "tomato", hex: "#FF6347", rgb: "rgb(255, 99, 71)", category: "Reds" },

  // Oranges
  { name: "orange", hex: "#FFA500", rgb: "rgb(255, 165, 0)", category: "Oranges" },
  { name: "darkorange", hex: "#FF8C00", rgb: "rgb(255, 140, 0)", category: "Oranges" },
  { name: "coral", hex: "#FF7F50", rgb: "rgb(255, 127, 80)", category: "Oranges" },
  { name: "orangered", hex: "#FF4500", rgb: "rgb(255, 69, 0)", category: "Oranges" },

  // Yellows
  { name: "yellow", hex: "#FFFF00", rgb: "rgb(255, 255, 0)", category: "Yellows" },
  { name: "gold", hex: "#FFD700", rgb: "rgb(255, 215, 0)", category: "Yellows" },
  { name: "khaki", hex: "#F0E68C", rgb: "rgb(240, 230, 140)", category: "Yellows" },
  { name: "lightyellow", hex: "#FFFFE0", rgb: "rgb(255, 255, 224)", category: "Yellows" },

  // Greens
  { name: "green", hex: "#008000", rgb: "rgb(0, 128, 0)", category: "Greens" },
  { name: "lime", hex: "#00FF00", rgb: "rgb(0, 255, 0)", category: "Greens" },
  { name: "limegreen", hex: "#32CD32", rgb: "rgb(50, 205, 50)", category: "Greens" },
  { name: "forestgreen", hex: "#228B22", rgb: "rgb(34, 139, 34)", category: "Greens" },
  { name: "darkgreen", hex: "#006400", rgb: "rgb(0, 100, 0)", category: "Greens" },
  { name: "seagreen", hex: "#2E8B57", rgb: "rgb(46, 139, 87)", category: "Greens" },
  { name: "olive", hex: "#808000", rgb: "rgb(128, 128, 0)", category: "Greens" },
  { name: "olivedrab", hex: "#6B8E23", rgb: "rgb(107, 142, 35)", category: "Greens" },
  { name: "mediumseagreen", hex: "#3CB371", rgb: "rgb(60, 179, 113)", category: "Greens" },

  // Blues
  { name: "blue", hex: "#0000FF", rgb: "rgb(0, 0, 255)", category: "Blues" },
  { name: "navy", hex: "#000080", rgb: "rgb(0, 0, 128)", category: "Blues" },
  { name: "darkblue", hex: "#00008B", rgb: "rgb(0, 0, 139)", category: "Blues" },
  { name: "mediumblue", hex: "#0000CD", rgb: "rgb(0, 0, 205)", category: "Blues" },
  { name: "royalblue", hex: "#4169E1", rgb: "rgb(65, 105, 225)", category: "Blues" },
  { name: "steelblue", hex: "#4682B4", rgb: "rgb(70, 130, 180)", category: "Blues" },
  { name: "dodgerblue", hex: "#1E90FF", rgb: "rgb(30, 144, 255)", category: "Blues" },
  { name: "deepskyblue", hex: "#00BFFF", rgb: "rgb(0, 191, 255)", category: "Blues" },
  { name: "skyblue", hex: "#87CEEB", rgb: "rgb(135, 206, 235)", category: "Blues" },
  { name: "lightblue", hex: "#ADD8E6", rgb: "rgb(173, 216, 230)", category: "Blues" },
  { name: "cornflowerblue", hex: "#6495ED", rgb: "rgb(100, 149, 237)", category: "Blues" },

  // Purples
  { name: "purple", hex: "#800080", rgb: "rgb(128, 0, 128)", category: "Purples" },
  { name: "indigo", hex: "#4B0082", rgb: "rgb(75, 0, 130)", category: "Purples" },
  { name: "darkviolet", hex: "#9400D3", rgb: "rgb(148, 0, 211)", category: "Purples" },
  { name: "blueviolet", hex: "#8A2BE2", rgb: "rgb(138, 43, 226)", category: "Purples" },
  { name: "mediumorchid", hex: "#BA55D3", rgb: "rgb(186, 85, 211)", category: "Purples" },
  { name: "orchid", hex: "#DA70D6", rgb: "rgb(218, 112, 214)", category: "Purples" },
  { name: "violet", hex: "#EE82EE", rgb: "rgb(238, 130, 238)", category: "Purples" },
  { name: "plum", hex: "#DDA0DD", rgb: "rgb(221, 160, 221)", category: "Purples" },
  { name: "lavender", hex: "#E6E6FA", rgb: "rgb(230, 230, 250)", category: "Purples" },

  // Pinks
  { name: "pink", hex: "#FFC0CB", rgb: "rgb(255, 192, 203)", category: "Pinks" },
  { name: "hotpink", hex: "#FF69B4", rgb: "rgb(255, 105, 180)", category: "Pinks" },
  { name: "deeppink", hex: "#FF1493", rgb: "rgb(255, 20, 147)", category: "Pinks" },
  { name: "magenta", hex: "#FF00FF", rgb: "rgb(255, 0, 255)", category: "Pinks" },
  { name: "fuchsia", hex: "#FF00FF", rgb: "rgb(255, 0, 255)", category: "Pinks" },

  // Browns
  { name: "brown", hex: "#A52A2A", rgb: "rgb(165, 42, 42)", category: "Browns" },
  { name: "maroon", hex: "#800000", rgb: "rgb(128, 0, 0)", category: "Browns" },
  { name: "sienna", hex: "#A0522D", rgb: "rgb(160, 82, 45)", category: "Browns" },
  { name: "saddlebrown", hex: "#8B4513", rgb: "rgb(139, 69, 19)", category: "Browns" },
  { name: "chocolate", hex: "#D2691E", rgb: "rgb(210, 105, 30)", category: "Browns" },
  { name: "peru", hex: "#CD853F", rgb: "rgb(205, 133, 63)", category: "Browns" },
  { name: "tan", hex: "#D2B48C", rgb: "rgb(210, 180, 140)", category: "Browns" },

  // Whites & Grays
  { name: "white", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)", category: "Whites & Grays" },
  { name: "snow", hex: "#FFFAFA", rgb: "rgb(255, 250, 250)", category: "Whites & Grays" },
  { name: "whitesmoke", hex: "#F5F5F5", rgb: "rgb(245, 245, 245)", category: "Whites & Grays" },
  { name: "lightgray", hex: "#D3D3D3", rgb: "rgb(211, 211, 211)", category: "Whites & Grays" },
  { name: "silver", hex: "#C0C0C0", rgb: "rgb(192, 192, 192)", category: "Whites & Grays" },
  { name: "darkgray", hex: "#A9A9A9", rgb: "rgb(169, 169, 169)", category: "Whites & Grays" },
  { name: "gray", hex: "#808080", rgb: "rgb(128, 128, 128)", category: "Whites & Grays" },
  { name: "dimgray", hex: "#696969", rgb: "rgb(105, 105, 105)", category: "Whites & Grays" },
  { name: "black", hex: "#000000", rgb: "rgb(0, 0, 0)", category: "Whites & Grays" },

  // Cyans & Aquas
  { name: "cyan", hex: "#00FFFF", rgb: "rgb(0, 255, 255)", category: "Cyans" },
  { name: "aqua", hex: "#00FFFF", rgb: "rgb(0, 255, 255)", category: "Cyans" },
  { name: "turquoise", hex: "#40E0D0", rgb: "rgb(64, 224, 208)", category: "Cyans" },
  { name: "mediumturquoise", hex: "#48D1CC", rgb: "rgb(72, 209, 204)", category: "Cyans" },
  { name: "darkturquoise", hex: "#00CED1", rgb: "rgb(0, 206, 209)", category: "Cyans" },
  { name: "lightcyan", hex: "#E0FFFF", rgb: "rgb(224, 255, 255)", category: "Cyans" },
  { name: "teal", hex: "#008080", rgb: "rgb(0, 128, 128)", category: "Cyans" },
];

export default function ColorNamesPage() {
  const [search, setSearch] = useState("");

  const filtered = colors.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hex.toLowerCase().includes(search.toLowerCase()) ||
      c.rgb.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(colors.map((c) => c.category)));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Color Names Reference</h1>
        <p className="text-muted-foreground">HTML/CSS named colors with hex and RGB values</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find colors by name, hex, or RGB value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search colors..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((c) => c.category === category);
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
                      <th className="p-2 text-left">Preview</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Hex</th>
                      <th className="p-2 text-left">RGB</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className="p-2">
                          <div
                            className="w-12 h-8 rounded border border-border"
                            style={{ backgroundColor: item.hex }}
                          />
                        </td>
                        <td className="p-2 font-semibold">{item.name}</td>
                        <td className="p-2 font-mono text-sm">{item.hex}</td>
                        <td className="p-2 font-mono text-xs text-muted-foreground">{item.rgb}</td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <button
                              onClick={() => copyToClipboard(item.hex)}
                              className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              Hex
                            </button>
                            <button
                              onClick={() => copyToClipboard(item.rgb)}
                              className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            >
                              RGB
                            </button>
                          </div>
                        </td>
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
            No colors found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
