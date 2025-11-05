# Developer Tools

A comprehensive collection of developer tools built with Next.js and shadcn/ui, designed to run entirely client-side for privacy.

## 🚀 Deployment to Cloudflare Workers

This project is configured to deploy as a **Cloudflare Worker** with Workers Assets for optimal performance.

### Option 1: Wrangler CLI (Recommended)

```bash
# Install dependencies
pnpm install

# Build and deploy
pnpm deploy
```

If you get an authentication error, login first:

```bash
pnpm wrangler login
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages
3. Click **Create** → **Create Worker**
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command:** `pnpm pages:build`
   - **Root directory:** `tools`
6. Click **Save and Deploy**

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## 📦 Tools Included

### Converters
- **JSON ⟷ YAML** - Bidirectional conversion with validation
- **Timestamp** - Unix timestamp ⟷ human-readable dates

### Encoders
- **Base64** - Encode/decode Base64 strings
- **URL Encode** - Encode/decode URL parameters

### Crypto
- **Hash Generator** - SHA-1, SHA-256, SHA-512

### Generators
- **UUID** - Generate UUIDs v4

### Formatters
- **JSON Formatter** - Format, validate, minify JSON

### Text Tools
- **Text Diff** - Compare text blocks
- **Case Converter** - camelCase, snake_case, kebab-case, etc.

## 🔒 Privacy

All tools run entirely in your browser. Your data never leaves your device.

## 🏗️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Cloudflare Pages** - Static hosting

## 📝 License

MIT
