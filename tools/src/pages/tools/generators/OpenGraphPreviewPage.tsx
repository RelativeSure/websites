import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Copy, Check, ExternalLink } from "lucide-react";

export default function OpenGraphPreviewPage() {
  const [title, setTitle] = useState("Your Page Title");
  const [description, setDescription] = useState("A brief description of your page content.");
  const [imageUrl, setImageUrl] = useState("https://example.com/image.jpg");
  const [url, setUrl] = useState("https://example.com");
  const [siteName, setSiteName] = useState("Example Site");
  const [type, setType] = useState("website");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags = [
      "<!-- Open Graph / Facebook -->",
      `<meta property="og:type" content="${type}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:title" content="${title}">`,
      `<meta property="og:description" content="${description}">`,
      `<meta property="og:image" content="${imageUrl}">`,
      `<meta property="og:site_name" content="${siteName}">`,
      "",
      "<!-- Twitter -->",
      `<meta property="twitter:card" content="${twitterCard}">`,
      `<meta property="twitter:url" content="${url}">`,
      `<meta property="twitter:title" content="${title}">`,
      `<meta property="twitter:description" content="${description}">`,
      `<meta property="twitter:image" content="${imageUrl}">`,
    ];
    return tags.join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMetaTags());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const loadExample = () => {
    setTitle("Build Amazing Web Apps with Modern Tools");
    setDescription(
      "Discover the best developer tools for building, testing, and deploying modern web applications. Free online utilities for developers."
    );
    setImageUrl("https://via.placeholder.com/1200x630/4F46E5/ffffff?text=DevTools");
    setUrl("https://devtools.example.com");
    setSiteName("DevTools Collection");
    setType("website");
    setTwitterCard("summary_large_image");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Open Graph Preview</h1>
        <p className="text-muted-foreground">
          Preview how your page will appear when shared on social media
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meta Information</CardTitle>
              <CardDescription>
                Enter your page details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your page title"
                  maxLength={60}
                />
                <div className="text-xs text-muted-foreground">
                  {title.length}/60 characters (optimal: 40-60)
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your page"
                  rows={3}
                  maxLength={160}
                />
                <div className="text-xs text-muted-foreground">
                  {description.length}/160 characters (optimal: 110-160)
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <div className="text-xs text-muted-foreground">
                  Recommended: 1200×630px (1.91:1 ratio)
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Page URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Your Site Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">OG Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterCard">Twitter Card</Label>
                  <Select value={twitterCard} onValueChange={setTwitterCard}>
                    <SelectTrigger id="twitterCard">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="summary_large_image">
                        Summary Large Image
                      </SelectItem>
                      <SelectItem value="app">App</SelectItem>
                      <SelectItem value="player">Player</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={loadExample} variant="outline" className="w-full">
                Load Example
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meta Tags</CardTitle>
                  <CardDescription>
                    Copy these tags to your HTML &lt;head&gt;
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
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
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generateMetaTags()}
                readOnly
                className="font-mono text-xs min-h-[300px] bg-muted"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Facebook Preview
              </CardTitle>
              <CardDescription>
                How your link will appear on Facebook
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-white">
                {imageUrl && (
                  <div className="relative bg-gray-100" style={{ paddingBottom: "52.36%" }}>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/1200x630/cccccc/666666?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
                <div className="p-3 border-t">
                  <div className="text-xs text-gray-500 uppercase mb-1">{url}</div>
                  <div className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {title}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">{description}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Twitter Preview
              </CardTitle>
              <CardDescription>
                How your link will appear on Twitter/X
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-2xl overflow-hidden bg-white">
                {imageUrl && twitterCard === "summary_large_image" && (
                  <div className="relative bg-gray-100" style={{ paddingBottom: "52.36%" }}>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/1200x630/cccccc/666666?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
                <div className="p-3 border-t">
                  {twitterCard === "summary" && imageUrl && (
                    <div className="flex gap-3 mb-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150/cccccc/666666?text=No+Image";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {title}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {description}
                        </div>
                      </div>
                    </div>
                  )}
                  {twitterCard === "summary_large_image" && (
                    <div>
                      <div className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {title}
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {description}
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    {url.replace(/^https?:\/\//, "")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                LinkedIn Preview
              </CardTitle>
              <CardDescription>
                How your link will appear on LinkedIn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded overflow-hidden bg-white">
                {imageUrl && (
                  <div className="relative bg-gray-100" style={{ paddingBottom: "52.36%" }}>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/1200x627/cccccc/666666?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}
                <div className="p-3 border-t bg-gray-50">
                  <div className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{url}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Open Graph</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Open Graph protocol enables any web page to become a rich object in a social
            graph. It's used by Facebook, LinkedIn, and other platforms to display
            link previews.
          </p>
          <div>
            <strong>Best practices:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>
                <strong>Title:</strong> 40-60 characters, clear and descriptive
              </li>
              <li>
                <strong>Description:</strong> 110-160 characters, compelling summary
              </li>
              <li>
                <strong>Image:</strong> 1200×630px (1.91:1), under 8MB, JPG or PNG
              </li>
              <li>
                <strong>Twitter Card:</strong> Use summary_large_image for articles/blogs
              </li>
            </ul>
          </div>
          <p>
            <strong>Testing:</strong> Use{" "}
            <a
              href="https://developers.facebook.com/tools/debug/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Facebook Debugger
            </a>{" "}
            and{" "}
            <a
              href="https://cards-dev.twitter.com/validator"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Twitter Card Validator
            </a>{" "}
            to test your tags.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
