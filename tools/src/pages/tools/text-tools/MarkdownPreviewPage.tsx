import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(
    "# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2\n- List item 3\n\n```javascript\nconst hello = 'world';\n```"
  );

  // Simple markdown parser (basic implementation)
  const parseMarkdown = (md: string): string => {
    let html = md;

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");

    // Headers
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>'
    );

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1">$1</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, "</p><p>");
    html = `<p>${html}</p>`;

    return html;
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Markdown Preview</h1>
        <p className="text-muted-foreground">Write markdown and see live preview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-[calc(100vh-16rem)]">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Markdown</CardTitle>
            <CardDescription>Write your markdown here</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="font-mono flex-1 resize-none text-sm"
              placeholder="# Start writing markdown..."
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Live markdown preview</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
              style={{
                fontFamily: "inherit",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
