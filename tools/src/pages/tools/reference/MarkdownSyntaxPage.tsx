import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const syntax = [
  // Headings
  { name: "Heading 1", syntax: "# Heading", example: "# My Title", category: "Headings" },
  { name: "Heading 2", syntax: "## Heading", example: "## Section", category: "Headings" },
  { name: "Heading 3", syntax: "### Heading", example: "### Subsection", category: "Headings" },
  { name: "Heading 4", syntax: "#### Heading", example: "#### Minor Section", category: "Headings" },
  { name: "Heading 5", syntax: "##### Heading", example: "##### Small Heading", category: "Headings" },
  { name: "Heading 6", syntax: "###### Heading", example: "###### Tiny Heading", category: "Headings" },

  // Emphasis
  { name: "Bold", syntax: "**text** or __text__", example: "**bold text**", category: "Emphasis" },
  { name: "Italic", syntax: "*text* or _text_", example: "*italic text*", category: "Emphasis" },
  { name: "Bold & Italic", syntax: "***text***", example: "***bold and italic***", category: "Emphasis" },
  { name: "Strikethrough", syntax: "~~text~~", example: "~~strikethrough~~", category: "Emphasis" },
  { name: "Highlight", syntax: "==text==", example: "==highlighted==", category: "Emphasis" },

  // Lists
  { name: "Unordered List", syntax: "- item or * item", example: "- First item\\n- Second item", category: "Lists" },
  { name: "Ordered List", syntax: "1. item", example: "1. First item\\n2. Second item", category: "Lists" },
  { name: "Nested List", syntax: "  - sub-item", example: "- Item\\n  - Sub-item", category: "Lists" },
  { name: "Task List", syntax: "- [ ] task or - [x] done", example: "- [x] Done\\n- [ ] Todo", category: "Lists" },

  // Links & Images
  { name: "Link", syntax: "[text](url)", example: "[Google](https://google.com)", category: "Links & Media" },
  {
    name: "Link with Title",
    syntax: '[text](url "title")',
    example: '[Link](url "tooltip")',
    category: "Links & Media",
  },
  { name: "Automatic Link", syntax: "<url>", example: "<https://example.com>", category: "Links & Media" },
  { name: "Image", syntax: "![alt](url)", example: "![Logo](image.png)", category: "Links & Media" },
  {
    name: "Image with Title",
    syntax: '![alt](url "title")',
    example: '![Logo](img.png "My Logo")',
    category: "Links & Media",
  },
  {
    name: "Reference Link",
    syntax: "[text][ref]\\n[ref]: url",
    example: "[Link][1]\\n[1]: https://url",
    category: "Links & Media",
  },

  // Code
  { name: "Inline Code", syntax: "`code`", example: "`console.log()`", category: "Code" },
  { name: "Code Block", syntax: "```\\ncode\\n```", example: "```js\\nconst x = 1;\\n```", category: "Code" },
  { name: "Code Block (indent)", syntax: "    code", example: "    const x = 1;", category: "Code" },
  {
    name: "Code with Language",
    syntax: "```lang\\ncode\\n```",
    example: "```python\\nprint()\\n```",
    category: "Code",
  },

  // Blockquotes
  { name: "Blockquote", syntax: "> quote", example: "> This is a quote", category: "Blockquotes" },
  {
    name: "Nested Blockquote",
    syntax: "> quote\\n>> nested",
    example: "> Quote\\n>> Nested quote",
    category: "Blockquotes",
  },
  {
    name: "Multi-line Quote",
    syntax: "> line 1\\n> line 2",
    example: "> First line\\n> Second line",
    category: "Blockquotes",
  },

  // Horizontal Rules
  { name: "Horizontal Rule", syntax: "--- or *** or ___", example: "---", category: "Horizontal Rules" },
  { name: "HR with spaces", syntax: "- - -", example: "- - -", category: "Horizontal Rules" },

  // Tables
  {
    name: "Table",
    syntax: "| Col1 | Col2 |\\n|------|------|\\n| Data | Data |",
    example: "| Name | Age |\\n|------|-----|\\n| John | 30 |",
    category: "Tables",
  },
  {
    name: "Aligned Table",
    syntax: "|:---|:---:|---:|",
    example: "| Left | Center | Right |\\n|:-----|:------:|------:|",
    category: "Tables",
  },

  // Escaping
  { name: "Escape Character", syntax: "\\*text\\*", example: "\\*not italic\\*", category: "Escaping" },
  { name: "Escape Backslash", syntax: "\\\\", example: "Use \\\\ for backslash", category: "Escaping" },

  // Extended Syntax
  {
    name: "Footnote",
    syntax: "text[^1]\\n[^1]: note",
    example: "Reference[^1]\\n[^1]: Footnote",
    category: "Extended",
  },
  {
    name: "Definition List",
    syntax: "term\\n: definition",
    example: "Markdown\\n: Text formatting",
    category: "Extended",
  },
  { name: "Subscript", syntax: "H~2~O", example: "H~2~O", category: "Extended" },
  { name: "Superscript", syntax: "X^2^", example: "X^2^", category: "Extended" },
  { name: "Emoji", syntax: ":emoji:", example: ":smile: :heart:", category: "Extended" },

  // HTML
  { name: "HTML in Markdown", syntax: "<tag>content</tag>", example: "<div>HTML works</div>", category: "HTML" },
  { name: "Line Break", syntax: "line  \\nor <br>", example: "Line 1  \\nLine 2", category: "HTML" },
  { name: "Comments", syntax: "<!-- comment -->", example: "<!-- Hidden text -->", category: "HTML" },
];

export default function MarkdownSyntaxPage() {
  const [search, setSearch] = useState("");

  const filtered = syntax.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.syntax.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(syntax.map((s) => s.category)));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Markdown Syntax Reference</h1>
        <p className="text-muted-foreground">Complete markdown formatting syntax guide</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find markdown syntax by name or category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search syntax..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((s) => s.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-md border border-border hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="font-semibold text-primary">{item.name}</div>
                      <button
                        onClick={() => copyToClipboard(item.syntax)}
                        className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="mb-2">
                      <div className="text-xs text-muted-foreground mb-1">Syntax:</div>
                      <div className="font-mono text-sm bg-muted p-2 rounded overflow-x-auto">{item.syntax}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Example:</div>
                      <div className="font-mono text-sm bg-muted p-2 rounded overflow-x-auto">{item.example}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No syntax found matching "{search}"
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <div>
              • Extended syntax features (footnotes, definition lists, etc.) may not be supported in all Markdown
              parsers
            </div>
            <div>• Two spaces at the end of a line create a line break</div>
            <div>• Use backslash (\\) to escape special characters</div>
            <div>• GitHub Flavored Markdown (GFM) supports additional features like task lists and tables</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
