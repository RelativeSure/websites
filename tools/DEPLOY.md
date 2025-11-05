# Developer Tools

A comprehensive collection of developer tools built with Next.js and shadcn/ui, designed to run entirely client-side for privacy.

## 🚀 Deployment to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
3. Click **Create a project** → **Connect to Git**
4. Select your repository
5. Configure build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `pnpm build`
   - **Build output directory:** `out`
   - **Root directory:** `tools`
   - **Node version:** 20 or higher
6. Click **Save and Deploy**

### Option 2: Direct Upload via Wrangler

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Deploy to Cloudflare Pages
pnpm wrangler pages deploy out --project-name=developer-tools
```

If you get an authentication error, you need to login first:

```bash
pnpm wrangler login
```

### Option 3: Drag and Drop

1. Build locally: `pnpm build`
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
3. Click **Upload assets**
4. Drag the `out` folder to the upload area

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
