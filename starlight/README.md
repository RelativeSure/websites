# CV and Documentation

A personal documentation site built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), serving as both a CV and a knowledge base.

## 📚 Content

This site contains documentation and resources on various topics:
- IT Security
- Kubernetes
- Linux Systems
- Windows & WSL
- Bookmarks collection for:
  - Development
  - Security
  - Games
  - Health
  - And more...

## 🚀 Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [Starlight](https://starlight.astro.build) - Documentation Theme
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [React](https://reactjs.org) - UI Components
- [TypeScript](https://www.typescriptlang.org) - Type Safety
- [MDX](https://mdxjs.com) - Enhanced Markdown
- [Cloudflare Pages](https://pages.cloudflare.com) - Hosting

## 🛠️ Development

### Prerequisites

- Node.js >= 24.0
- pnpm (Package Manager)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build the site
- `pnpm preview` - Preview the built site
- `pnpm check` - Run type checking

## 📦 Project Structure

```markdown
.
├── src/
│   ├── content/    # Documentation content (MDX)
│   ├── components/ # UI components
│   ├── layouts/    # Page layouts
│   ├── pages/      # Route pages
│   └── styles/     # Global styles
├── public/         # Static assets
└── astro.config.mjs # Astro configuration
```

## 🌐 Deployment

The site is configured for Cloudflare deployment using Wrangler.
