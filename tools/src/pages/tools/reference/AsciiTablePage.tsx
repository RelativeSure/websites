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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ASCII printable characters (32-126)
const asciiChars = Array.from({ length: 95 }, (_, i) => {
  const code = i + 32;
  return {
    decimal: code,
    hex: code.toString(16).toUpperCase().padStart(2, '0'),
    binary: code.toString(2).padStart(8, '0'),
    char: String.fromCharCode(code),
    description: getAsciiDescription(code),
    category: "Printable"
  };
});

// ASCII control characters (0-31 + 127)
const controlChars = [
  { decimal: 0, hex: "00", binary: "00000000", char: "NUL", description: "Null", category: "Control" },
  { decimal: 9, hex: "09", binary: "00001001", char: "TAB", description: "Horizontal Tab", category: "Control" },
  { decimal: 10, hex: "0A", binary: "00001010", char: "LF", description: "Line Feed", category: "Control" },
  { decimal: 13, hex: "0D", binary: "00001101", char: "CR", description: "Carriage Return", category: "Control" },
  { decimal: 27, hex: "1B", binary: "00011011", char: "ESC", description: "Escape", category: "Control" },
  { decimal: 32, hex: "20", binary: "00100000", char: "SP", description: "Space", category: "Control" },
  { decimal: 127, hex: "7F", binary: "01111111", char: "DEL", description: "Delete", category: "Control" },
];

// Common Unicode symbols
const unicodeSymbols = [
  { char: "←", code: "U+2190", decimal: 8592, description: "Leftwards Arrow", category: "Arrows" },
  { char: "→", code: "U+2192", decimal: 8594, description: "Rightwards Arrow", category: "Arrows" },
  { char: "↑", code: "U+2191", decimal: 8593, description: "Upwards Arrow", category: "Arrows" },
  { char: "↓", code: "U+2193", decimal: 8595, description: "Downwards Arrow", category: "Arrows" },
  { char: "⇐", code: "U+21D0", decimal: 8656, description: "Leftwards Double Arrow", category: "Arrows" },
  { char: "⇒", code: "U+21D2", decimal: 8658, description: "Rightwards Double Arrow", category: "Arrows" },
  { char: "⇔", code: "U+21D4", decimal: 8660, description: "Left Right Double Arrow", category: "Arrows" },

  { char: "×", code: "U+00D7", decimal: 215, description: "Multiplication Sign", category: "Math" },
  { char: "÷", code: "U+00F7", decimal: 247, description: "Division Sign", category: "Math" },
  { char: "±", code: "U+00B1", decimal: 177, description: "Plus-Minus Sign", category: "Math" },
  { char: "≠", code: "U+2260", decimal: 8800, description: "Not Equal To", category: "Math" },
  { char: "≤", code: "U+2264", decimal: 8804, description: "Less-Than or Equal To", category: "Math" },
  { char: "≥", code: "U+2265", decimal: 8805, description: "Greater-Than or Equal To", category: "Math" },
  { char: "∞", code: "U+221E", decimal: 8734, description: "Infinity", category: "Math" },
  { char: "√", code: "U+221A", decimal: 8730, description: "Square Root", category: "Math" },
  { char: "π", code: "U+03C0", decimal: 960, description: "Greek Small Letter Pi", category: "Math" },
  { char: "Σ", code: "U+03A3", decimal: 931, description: "Greek Capital Letter Sigma", category: "Math" },

  { char: "•", code: "U+2022", decimal: 8226, description: "Bullet", category: "Symbols" },
  { char: "◦", code: "U+25E6", decimal: 9702, description: "White Bullet", category: "Symbols" },
  { char: "★", code: "U+2605", decimal: 9733, description: "Black Star", category: "Symbols" },
  { char: "☆", code: "U+2606", decimal: 9734, description: "White Star", category: "Symbols" },
  { char: "♠", code: "U+2660", decimal: 9824, description: "Black Spade Suit", category: "Symbols" },
  { char: "♣", code: "U+2663", decimal: 9827, description: "Black Club Suit", category: "Symbols" },
  { char: "♥", code: "U+2665", decimal: 9829, description: "Black Heart Suit", category: "Symbols" },
  { char: "♦", code: "U+2666", decimal: 9830, description: "Black Diamond Suit", category: "Symbols" },
  { char: "©", code: "U+00A9", decimal: 169, description: "Copyright Sign", category: "Symbols" },
  { char: "®", code: "U+00AE", decimal: 174, description: "Registered Sign", category: "Symbols" },
  { char: "™", code: "U+2122", decimal: 8482, description: "Trade Mark Sign", category: "Symbols" },
  { char: "°", code: "U+00B0", decimal: 176, description: "Degree Sign", category: "Symbols" },

  { char: "✓", code: "U+2713", decimal: 10003, description: "Check Mark", category: "Checkmarks" },
  { char: "✗", code: "U+2717", decimal: 10007, description: "Ballot X", category: "Checkmarks" },
  { char: "✔", code: "U+2714", decimal: 10004, description: "Heavy Check Mark", category: "Checkmarks" },
  { char: "✘", code: "U+2718", decimal: 10008, description: "Heavy Ballot X", category: "Checkmarks" },
];

function getAsciiDescription(code: number): string {
  if (code >= 48 && code <= 57) return "Digit";
  if (code >= 65 && code <= 90) return "Uppercase Letter";
  if (code >= 97 && code <= 122) return "Lowercase Letter";
  const special: Record<number, string> = {
    32: "Space", 33: "Exclamation Mark", 34: "Quotation Mark", 35: "Number Sign",
    36: "Dollar Sign", 37: "Percent Sign", 38: "Ampersand", 39: "Apostrophe",
    40: "Left Parenthesis", 41: "Right Parenthesis", 42: "Asterisk", 43: "Plus Sign",
    44: "Comma", 45: "Hyphen", 46: "Period", 47: "Slash",
    58: "Colon", 59: "Semicolon", 60: "Less-Than", 61: "Equals",
    62: "Greater-Than", 63: "Question Mark", 64: "At Sign",
    91: "Left Bracket", 92: "Backslash", 93: "Right Bracket", 94: "Caret",
    95: "Underscore", 96: "Grave Accent",
    123: "Left Brace", 124: "Vertical Bar", 125: "Right Brace", 126: "Tilde"
  };
  return special[code] || "Special Character";
}

export default function AsciiTablePage() {
  const [search, setSearch] = useState("");

  const filteredAscii = asciiChars.filter(
    (a) =>
      a.char.includes(search) ||
      a.decimal.toString().includes(search) ||
      a.hex.includes(search.toUpperCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredControl = controlChars.filter(
    (c) =>
      c.char.toLowerCase().includes(search.toLowerCase()) ||
      c.decimal.toString().includes(search) ||
      c.hex.includes(search.toUpperCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUnicode = unicodeSymbols.filter(
    (u) =>
      u.char.includes(search) ||
      u.code.toLowerCase().includes(search.toLowerCase()) ||
      u.description.toLowerCase().includes(search.toLowerCase())
  );

  const unicodeCategories = Array.from(new Set(unicodeSymbols.map((u) => u.category)));

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ASCII & Unicode Reference</h1>
        <p className="text-muted-foreground">
          Character encoding reference table
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find characters by symbol, code, or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ascii" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ascii">ASCII Printable</TabsTrigger>
          <TabsTrigger value="control">Control Characters</TabsTrigger>
          <TabsTrigger value="unicode">Unicode Symbols</TabsTrigger>
        </TabsList>

        <TabsContent value="ascii">
          <Card>
            <CardHeader>
              <CardTitle>ASCII Printable Characters (32-126)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Char</th>
                      <th className="p-2 text-left">Dec</th>
                      <th className="p-2 text-left">Hex</th>
                      <th className="p-2 text-left">Binary</th>
                      <th className="p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAscii.map((item) => (
                      <tr key={item.decimal} className="border-b hover:bg-muted">
                        <td className="p-2 font-mono text-lg font-bold">{item.char}</td>
                        <td className="p-2 font-mono">{item.decimal}</td>
                        <td className="p-2 font-mono">{item.hex}</td>
                        <td className="p-2 font-mono text-xs">{item.binary}</td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control">
          <Card>
            <CardHeader>
              <CardTitle>Control Characters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Symbol</th>
                      <th className="p-2 text-left">Dec</th>
                      <th className="p-2 text-left">Hex</th>
                      <th className="p-2 text-left">Binary</th>
                      <th className="p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredControl.map((item) => (
                      <tr key={item.decimal} className="border-b hover:bg-muted">
                        <td className="p-2 font-mono font-bold">{item.char}</td>
                        <td className="p-2 font-mono">{item.decimal}</td>
                        <td className="p-2 font-mono">{item.hex}</td>
                        <td className="p-2 font-mono text-xs">{item.binary}</td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unicode">
          {unicodeCategories.map((category) => {
            const items = filteredUnicode.filter((u) => u.category === category);
            if (items.length === 0) return null;

            return (
              <Card key={category} className="mb-4">
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Symbol</th>
                          <th className="p-2 text-left">Unicode</th>
                          <th className="p-2 text-left">Decimal</th>
                          <th className="p-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.code} className="border-b hover:bg-muted">
                            <td className="p-2 font-mono text-2xl">{item.char}</td>
                            <td className="p-2 font-mono">{item.code}</td>
                            <td className="p-2 font-mono">{item.decimal}</td>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
