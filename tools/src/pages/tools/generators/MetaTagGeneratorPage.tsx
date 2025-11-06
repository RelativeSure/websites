import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check, Globe, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [copied, setCopied] = useState(false);

  const generateBasicTags = () => {
    const tags = [];
    if (title) tags.push(`<title>${title}</title>`);
    if (description) tags.push(`<meta name="description" content="${description}">`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}">`);
    if (author) tags.push(`<meta name="author" content="${author}">`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    tags.push(`<meta charset="UTF-8">`);
    return tags.join("\n");
  };

  const generateOpenGraphTags = () => {
    const tags = [];
    if (title) tags.push(`<meta property="og:title" content="${title}">`);
    if (description) tags.push(`<meta property="og:description" content="${description}">`);
    if (url) tags.push(`<meta property="og:url" content="${url}">`);
    if (image) tags.push(`<meta property="og:image" content="${image}">`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}">`);
    tags.push(`<meta property="og:type" content="website">`);
    return tags.join("\n");
  };

  const generateTwitterTags = () => {
    const tags = [];
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    if (title) tags.push(`<meta name="twitter:title" content="${title}">`);
    if (description) tags.push(`<meta name="twitter:description" content="${description}">`);
    if (image) tags.push(`<meta name="twitter:image" content="${image}">`);
    if (twitterHandle) tags.push(`<meta name="twitter:site" content="${twitterHandle}">`);
    return tags.join("\n");
  };

  const generateAllTags = () => {
    return [
      generateBasicTags(),
      "",
      "<!-- Open Graph / Facebook -->",
      generateOpenGraphTags(),
      "",
      "<!-- Twitter -->",
      generateTwitterTags(),
    ].join("\n");
  };

  const allTags = generateAllTags();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(allTags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Meta Tag Generator</h1>
        <p className="text-muted-foreground">
          Generate SEO and social media meta tags
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Essential meta tags for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your Page Title"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {title.length}/60 characters (optimal: 50-60)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of your page"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/160 characters (optimal: 150-160)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name or Company"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media
              </CardTitle>
              <CardDescription>
                Open Graph and Twitter Card tags
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200x630px for best display
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Your Website Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter Handle</Label>
                <Input
                  id="twitter"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@yourusername"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Tags</CardTitle>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>
                Copy and paste into your HTML &lt;head&gt;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="og">OG</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <Textarea
                    value={allTags}
                    readOnly
                    className="min-h-[500px] font-mono text-xs"
                  />
                </TabsContent>

                <TabsContent value="basic" className="mt-4">
                  <Textarea
                    value={generateBasicTags()}
                    readOnly
                    className="min-h-[500px] font-mono text-xs"
                  />
                </TabsContent>

                <TabsContent value="og" className="mt-4">
                  <Textarea
                    value={generateOpenGraphTags()}
                    readOnly
                    className="min-h-[500px] font-mono text-xs"
                  />
                </TabsContent>

                <TabsContent value="twitter" className="mt-4">
                  <Textarea
                    value={generateTwitterTags()}
                    readOnly
                    className="min-h-[500px] font-mono text-xs"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {image && (
            <Card>
              <CardHeader>
                <CardTitle>Preview Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={image}
                  alt="Social media preview"
                  className="w-full rounded-md border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• <strong>Title:</strong> 50-60 characters, include primary keyword</p>
          <p>• <strong>Description:</strong> 150-160 characters, compelling and unique</p>
          <p>• <strong>Image:</strong> 1200x630px (1.91:1 ratio) for optimal display on all platforms</p>
          <p>• <strong>Open Graph:</strong> Used by Facebook, LinkedIn, and other social platforms</p>
          <p>• <strong>Twitter Cards:</strong> Special meta tags for Twitter sharing</p>
          <p>• Test your tags using Facebook's Sharing Debugger and Twitter Card Validator</p>
        </CardContent>
      </Card>
    </div>
  );
}
