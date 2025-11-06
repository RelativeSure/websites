import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check, FileCode, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marked } from "marked";

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is **bold** and this is *italic*.\n\n- Item 1\n- Item 2\n- Item 3\n\n```javascript\nconsole.log('Hello!');\n```");
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const convertToHtml = () => {
    try {
      const converted = marked(markdown);
      setHtml(converted);
    } catch (err) {
      console.error("Conversion failed:", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Markdown to HTML Converter</h1>
        <p className="text-muted-foreground">
          Convert Markdown to HTML with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Markdown Input
            </CardTitle>
            <CardDescription>Enter your Markdown content</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# Your markdown here..."
              className="min-h-[500px] font-mono text-sm"
            />
            <Button onClick={convertToHtml} className="w-full mt-4">
              Convert to HTML
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>HTML code and preview</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="html">
                  <FileCode className="h-4 w-4 mr-2" />
                  HTML
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                <div
                  className="prose dark:prose-invert max-w-none p-4 border rounded-md min-h-[450px] overflow-auto bg-muted/30"
                  dangerouslySetInnerHTML={{ __html: html || "<p class='text-muted-foreground'>Preview will appear here...</p>" }}
                />
              </TabsContent>

              <TabsContent value="html" className="mt-4">
                <div className="relative">
                  <Textarea
                    value={html}
                    readOnly
                    placeholder="HTML output will appear here..."
                    className="min-h-[450px] font-mono text-xs"
                  />
                  {html && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="absolute top-2 right-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Markdown Syntax Guide</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Headings</h4>
            <code className="block p-2 bg-muted rounded mb-2"># H1<br/>## H2<br/>### H3</code>

            <h4 className="font-semibold mb-2 mt-4">Emphasis</h4>
            <code className="block p-2 bg-muted rounded mb-2">
              *italic* or _italic_<br/>
              **bold** or __bold__<br/>
              ~~strikethrough~~
            </code>

            <h4 className="font-semibold mb-2 mt-4">Lists</h4>
            <code className="block p-2 bg-muted rounded">
              - Unordered item<br/>
              - Another item<br/>
              <br/>
              1. Ordered item<br/>
              2. Another item
            </code>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Links & Images</h4>
            <code className="block p-2 bg-muted rounded mb-2">
              [Link text](url)<br/>
              ![Alt text](image-url)
            </code>

            <h4 className="font-semibold mb-2 mt-4">Code</h4>
            <code className="block p-2 bg-muted rounded mb-2">
              `inline code`<br/>
              <br/>
              ```language<br/>
              code block<br/>
              ```
            </code>

            <h4 className="font-semibold mb-2 mt-4">Quote & Horizontal Rule</h4>
            <code className="block p-2 bg-muted rounded">
              &gt; Blockquote<br/>
              <br/>
              ---
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
