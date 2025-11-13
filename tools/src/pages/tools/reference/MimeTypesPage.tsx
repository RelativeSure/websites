import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const mimeTypes = [
  // Text
  { extension: ".txt", mimeType: "text/plain", description: "Plain text", category: "Text" },
  { extension: ".html", mimeType: "text/html", description: "HTML document", category: "Text" },
  { extension: ".htm", mimeType: "text/html", description: "HTML document", category: "Text" },
  { extension: ".css", mimeType: "text/css", description: "Cascading Style Sheets", category: "Text" },
  { extension: ".js", mimeType: "text/javascript", description: "JavaScript", category: "Text" },
  { extension: ".csv", mimeType: "text/csv", description: "Comma-separated values", category: "Text" },
  { extension: ".xml", mimeType: "text/xml", description: "XML document", category: "Text" },

  // Application
  { extension: ".json", mimeType: "application/json", description: "JSON data", category: "Application" },
  { extension: ".pdf", mimeType: "application/pdf", description: "Adobe PDF", category: "Application" },
  { extension: ".zip", mimeType: "application/zip", description: "ZIP archive", category: "Application" },
  { extension: ".gz", mimeType: "application/gzip", description: "GZIP archive", category: "Application" },
  { extension: ".tar", mimeType: "application/x-tar", description: "TAR archive", category: "Application" },
  { extension: ".rar", mimeType: "application/vnd.rar", description: "RAR archive", category: "Application" },
  { extension: ".7z", mimeType: "application/x-7z-compressed", description: "7-Zip archive", category: "Application" },
  { extension: ".doc", mimeType: "application/msword", description: "Microsoft Word", category: "Application" },
  {
    extension: ".docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    description: "Microsoft Word (OpenXML)",
    category: "Application",
  },
  { extension: ".xls", mimeType: "application/vnd.ms-excel", description: "Microsoft Excel", category: "Application" },
  {
    extension: ".xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    description: "Microsoft Excel (OpenXML)",
    category: "Application",
  },
  {
    extension: ".ppt",
    mimeType: "application/vnd.ms-powerpoint",
    description: "Microsoft PowerPoint",
    category: "Application",
  },
  {
    extension: ".pptx",
    mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    description: "Microsoft PowerPoint (OpenXML)",
    category: "Application",
  },
  { extension: ".wasm", mimeType: "application/wasm", description: "WebAssembly binary", category: "Application" },

  // Images
  { extension: ".jpg", mimeType: "image/jpeg", description: "JPEG image", category: "Image" },
  { extension: ".jpeg", mimeType: "image/jpeg", description: "JPEG image", category: "Image" },
  { extension: ".png", mimeType: "image/png", description: "PNG image", category: "Image" },
  { extension: ".gif", mimeType: "image/gif", description: "GIF image", category: "Image" },
  { extension: ".webp", mimeType: "image/webp", description: "WebP image", category: "Image" },
  { extension: ".svg", mimeType: "image/svg+xml", description: "SVG vector image", category: "Image" },
  { extension: ".ico", mimeType: "image/x-icon", description: "Icon image", category: "Image" },
  { extension: ".bmp", mimeType: "image/bmp", description: "Bitmap image", category: "Image" },
  { extension: ".tiff", mimeType: "image/tiff", description: "TIFF image", category: "Image" },
  { extension: ".avif", mimeType: "image/avif", description: "AVIF image", category: "Image" },

  // Video
  { extension: ".mp4", mimeType: "video/mp4", description: "MP4 video", category: "Video" },
  { extension: ".webm", mimeType: "video/webm", description: "WebM video", category: "Video" },
  { extension: ".ogg", mimeType: "video/ogg", description: "OGG video", category: "Video" },
  { extension: ".avi", mimeType: "video/x-msvideo", description: "AVI video", category: "Video" },
  { extension: ".mpeg", mimeType: "video/mpeg", description: "MPEG video", category: "Video" },
  { extension: ".mov", mimeType: "video/quicktime", description: "QuickTime video", category: "Video" },
  { extension: ".mkv", mimeType: "video/x-matroska", description: "Matroska video", category: "Video" },

  // Audio
  { extension: ".mp3", mimeType: "audio/mpeg", description: "MP3 audio", category: "Audio" },
  { extension: ".wav", mimeType: "audio/wav", description: "WAV audio", category: "Audio" },
  { extension: ".ogg", mimeType: "audio/ogg", description: "OGG audio", category: "Audio" },
  { extension: ".m4a", mimeType: "audio/mp4", description: "M4A audio", category: "Audio" },
  { extension: ".flac", mimeType: "audio/flac", description: "FLAC audio", category: "Audio" },
  { extension: ".aac", mimeType: "audio/aac", description: "AAC audio", category: "Audio" },
  { extension: ".weba", mimeType: "audio/webm", description: "WebM audio", category: "Audio" },

  // Fonts
  { extension: ".woff", mimeType: "font/woff", description: "WOFF font", category: "Font" },
  { extension: ".woff2", mimeType: "font/woff2", description: "WOFF2 font", category: "Font" },
  { extension: ".ttf", mimeType: "font/ttf", description: "TrueType font", category: "Font" },
  { extension: ".otf", mimeType: "font/otf", description: "OpenType font", category: "Font" },
  { extension: ".eot", mimeType: "application/vnd.ms-fontobject", description: "EOT font", category: "Font" },

  // Application Data
  { extension: ".jsonld", mimeType: "application/ld+json", description: "JSON-LD", category: "Application" },
  { extension: ".yaml", mimeType: "application/x-yaml", description: "YAML data", category: "Application" },
  { extension: ".yml", mimeType: "application/x-yaml", description: "YAML data", category: "Application" },
  { extension: ".md", mimeType: "text/markdown", description: "Markdown", category: "Text" },

  // Binary/Executable
  { extension: ".bin", mimeType: "application/octet-stream", description: "Binary data", category: "Binary" },
  {
    extension: ".exe",
    mimeType: "application/vnd.microsoft.portable-executable",
    description: "Windows executable",
    category: "Binary",
  },
  {
    extension: ".dll",
    mimeType: "application/vnd.microsoft.portable-executable",
    description: "Windows DLL",
    category: "Binary",
  },
  { extension: ".dmg", mimeType: "application/x-apple-diskimage", description: "macOS disk image", category: "Binary" },
  {
    extension: ".deb",
    mimeType: "application/vnd.debian.binary-package",
    description: "Debian package",
    category: "Binary",
  },
  { extension: ".rpm", mimeType: "application/x-rpm", description: "RPM package", category: "Binary" },
];

export default function MimeTypesPage() {
  const [search, setSearch] = useState("");

  const filtered = mimeTypes.filter(
    (m) =>
      m.extension.toLowerCase().includes(search.toLowerCase()) ||
      m.mimeType.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(mimeTypes.map((m) => m.category)));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">MIME Types Reference</h1>
        <p className="text-muted-foreground">Media type / content type reference</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find MIME types by extension, type, or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search MIME types..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((m) => m.category === category);
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
                      <th className="p-2 text-left">Extension</th>
                      <th className="p-2 text-left">MIME Type</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className="p-2 font-mono font-semibold">{item.extension}</td>
                        <td className="p-2 font-mono text-xs">{item.mimeType}</td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
                        <td className="p-2">
                          <button
                            onClick={() => copyToClipboard(item.mimeType)}
                            className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Copy
                          </button>
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
            No MIME types found matching "{search}"
          </CardContent>
        </Card>
      )}
    </div>
  );
}
