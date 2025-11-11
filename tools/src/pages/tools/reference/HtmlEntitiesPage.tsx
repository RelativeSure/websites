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

const entities = [
  // Reserved Characters
  { char: "<", entity: "&lt;", code: "&#60;", description: "Less than", category: "Reserved" },
  { char: ">", entity: "&gt;", code: "&#62;", description: "Greater than", category: "Reserved" },
  { char: "&", entity: "&amp;", code: "&#38;", description: "Ampersand", category: "Reserved" },
  { char: '"', entity: "&quot;", code: "&#34;", description: "Quotation mark", category: "Reserved" },
  { char: "'", entity: "&apos;", code: "&#39;", description: "Apostrophe", category: "Reserved" },

  // Common Symbols
  { char: " ", entity: "&nbsp;", code: "&#160;", description: "Non-breaking space", category: "Spacing" },
  { char: "©", entity: "&copy;", code: "&#169;", description: "Copyright", category: "Symbols" },
  { char: "®", entity: "&reg;", code: "&#174;", description: "Registered trademark", category: "Symbols" },
  { char: "™", entity: "&trade;", code: "&#8482;", description: "Trademark", category: "Symbols" },
  { char: "€", entity: "&euro;", code: "&#8364;", description: "Euro", category: "Currency" },
  { char: "£", entity: "&pound;", code: "&#163;", description: "Pound", category: "Currency" },
  { char: "¥", entity: "&yen;", code: "&#165;", description: "Yen", category: "Currency" },
  { char: "¢", entity: "&cent;", code: "&#162;", description: "Cent", category: "Currency" },
  { char: "°", entity: "&deg;", code: "&#176;", description: "Degree", category: "Symbols" },
  { char: "±", entity: "&plusmn;", code: "&#177;", description: "Plus-minus", category: "Math" },
  { char: "×", entity: "&times;", code: "&#215;", description: "Multiplication", category: "Math" },
  { char: "÷", entity: "&divide;", code: "&#247;", description: "Division", category: "Math" },
  { char: "¼", entity: "&frac14;", code: "&#188;", description: "One quarter", category: "Math" },
  { char: "½", entity: "&frac12;", code: "&#189;", description: "One half", category: "Math" },
  { char: "¾", entity: "&frac34;", code: "&#190;", description: "Three quarters", category: "Math" },

  // Arrows
  { char: "←", entity: "&larr;", code: "&#8592;", description: "Left arrow", category: "Arrows" },
  { char: "→", entity: "&rarr;", code: "&#8594;", description: "Right arrow", category: "Arrows" },
  { char: "↑", entity: "&uarr;", code: "&#8593;", description: "Up arrow", category: "Arrows" },
  { char: "↓", entity: "&darr;", code: "&#8595;", description: "Down arrow", category: "Arrows" },
  { char: "↔", entity: "&harr;", code: "&#8596;", description: "Left-right arrow", category: "Arrows" },
  { char: "⇐", entity: "&lArr;", code: "&#8656;", description: "Left double arrow", category: "Arrows" },
  { char: "⇒", entity: "&rArr;", code: "&#8658;", description: "Right double arrow", category: "Arrows" },
  { char: "⇑", entity: "&uArr;", code: "&#8657;", description: "Up double arrow", category: "Arrows" },
  { char: "⇓", entity: "&dArr;", code: "&#8659;", description: "Down double arrow", category: "Arrows" },
  { char: "⇔", entity: "&hArr;", code: "&#8660;", description: "Left-right double arrow", category: "Arrows" },

  // Greek Letters
  { char: "α", entity: "&alpha;", code: "&#945;", description: "Greek alpha", category: "Greek" },
  { char: "β", entity: "&beta;", code: "&#946;", description: "Greek beta", category: "Greek" },
  { char: "γ", entity: "&gamma;", code: "&#947;", description: "Greek gamma", category: "Greek" },
  { char: "δ", entity: "&delta;", code: "&#948;", description: "Greek delta", category: "Greek" },
  { char: "π", entity: "&pi;", code: "&#960;", description: "Greek pi", category: "Greek" },
  { char: "Σ", entity: "&Sigma;", code: "&#931;", description: "Greek Sigma", category: "Greek" },
  { char: "σ", entity: "&sigma;", code: "&#963;", description: "Greek sigma", category: "Greek" },
  { char: "Ω", entity: "&Omega;", code: "&#937;", description: "Greek Omega", category: "Greek" },
  { char: "ω", entity: "&omega;", code: "&#969;", description: "Greek omega", category: "Greek" },

  // Math Symbols
  { char: "∀", entity: "&forall;", code: "&#8704;", description: "For all", category: "Math" },
  { char: "∃", entity: "&exist;", code: "&#8707;", description: "There exists", category: "Math" },
  { char: "∅", entity: "&empty;", code: "&#8709;", description: "Empty set", category: "Math" },
  { char: "∇", entity: "&nabla;", code: "&#8711;", description: "Nabla", category: "Math" },
  { char: "∈", entity: "&isin;", code: "&#8712;", description: "Element of", category: "Math" },
  { char: "∉", entity: "&notin;", code: "&#8713;", description: "Not element of", category: "Math" },
  { char: "∏", entity: "&prod;", code: "&#8719;", description: "Product", category: "Math" },
  { char: "∑", entity: "&sum;", code: "&#8721;", description: "Sum", category: "Math" },
  { char: "√", entity: "&radic;", code: "&#8730;", description: "Square root", category: "Math" },
  { char: "∞", entity: "&infin;", code: "&#8734;", description: "Infinity", category: "Math" },
  { char: "∫", entity: "&int;", code: "&#8747;", description: "Integral", category: "Math" },
  { char: "≈", entity: "&asymp;", code: "&#8776;", description: "Approximately", category: "Math" },
  { char: "≠", entity: "&ne;", code: "&#8800;", description: "Not equal", category: "Math" },
  { char: "≡", entity: "&equiv;", code: "&#8801;", description: "Equivalent", category: "Math" },
  { char: "≤", entity: "&le;", code: "&#8804;", description: "Less than or equal", category: "Math" },
  { char: "≥", entity: "&ge;", code: "&#8805;", description: "Greater than or equal", category: "Math" },

  // Miscellaneous
  { char: "•", entity: "&bull;", code: "&#8226;", description: "Bullet", category: "Symbols" },
  { char: "…", entity: "&hellip;", code: "&#8230;", description: "Ellipsis", category: "Symbols" },
  { char: "§", entity: "&sect;", code: "&#167;", description: "Section", category: "Symbols" },
  { char: "¶", entity: "&para;", code: "&#182;", description: "Paragraph", category: "Symbols" },
  { char: "†", entity: "&dagger;", code: "&#8224;", description: "Dagger", category: "Symbols" },
  { char: "‡", entity: "&Dagger;", code: "&#8225;", description: "Double dagger", category: "Symbols" },
  { char: "♠", entity: "&spades;", code: "&#9824;", description: "Spade", category: "Symbols" },
  { char: "♣", entity: "&clubs;", code: "&#9827;", description: "Club", category: "Symbols" },
  { char: "♥", entity: "&hearts;", code: "&#9829;", description: "Heart", category: "Symbols" },
  { char: "♦", entity: "&diams;", code: "&#9830;", description: "Diamond", category: "Symbols" },
];

export default function HtmlEntitiesPage() {
  const [search, setSearch] = useState("");

  const filtered = entities.filter(
    (e) =>
      e.char.includes(search) ||
      e.entity.toLowerCase().includes(search.toLowerCase()) ||
      e.code.includes(search) ||
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(entities.map((e) => e.category)));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">HTML Entities Reference</h1>
        <p className="text-muted-foreground">
          HTML character entity references
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find HTML entities by character, entity name, or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entities..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((e) => e.category === category);
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
                      <th className="p-2 text-left">Character</th>
                      <th className="p-2 text-left">Entity</th>
                      <th className="p-2 text-left">Numeric</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className="p-2 text-2xl font-mono">{item.char}</td>
                        <td className="p-2 font-mono text-sm">{item.entity}</td>
                        <td className="p-2 font-mono text-sm">{item.code}</td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
                        <td className="p-2">
                          <div className="flex gap-1">
                            <button
                              onClick={() => copyToClipboard(item.entity)}
                              className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              Entity
                            </button>
                            <button
                              onClick={() => copyToClipboard(item.code)}
                              className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            >
                              Code
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
            No entities found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
