# Repository Badges Component Guide

## Overview

The `RepositoryBadges` component provides an elegant way to showcase your open-source projects and maintained repositories on your site. Each repository is displayed as a rich card with status indicators, topic tags, and quick access links.

## Visual Examples

### Example 1: Maintained Repository
```
┌─────────────────────────────────────────────────────────┐
│ personal-fumadocs-site [maintained]                   │
│ Personal documentation and portfolio site built with   │
│ Fumadocs and Next.js                                  │
│                                                         │
│ #fumadocs #next.js #documentation #portfolio     View Repo │
└─────────────────────────────────────────────────────────┘
```

### Example 2: Archived Repository  
```
┌─────────────────────────────────────────────────────────┐
│ personal-starlight-site [archived]                    │
│ Archived Starlight documentation site                 │
│                                                         │
│ #starlight #astro #documentation              View Repo │
└─────────────────────────────────────────────────────────┘
```

### Example 3: In-Progress Repository
```
┌─────────────────────────────────────────────────────────┐
│ my-new-project [in-progress]                          │
│ Currently working on this amazing new tool...         │
│                                                         │
│ #rust #cli #devops                            View Repo │
└─────────────────────────────────────────────────────────┘
```

## Component Props

```typescript
interface Repository {
  name: string;           // Repository name (displayed as title)
  url: string;            // GitHub repository URL
  description: string;    // Brief description of the project
  topics?: string[];      // Array of technology tags/topics
  status?: 'maintained' | 'archived' | 'in-progress';
}

interface RepositoryBadgesProps {
  repositories: Repository[];
}
```

## Status Indicators

The component automatically colors and styles based on repository status:

### 🟢 Maintained (Green)
- Background: Light green
- Badge: Green with white text
- Indicates: Active development, issues are addressed promptly
- Best for: Current projects and tools

### 🔵 In-Progress (Blue)
- Background: Light blue  
- Badge: Blue with white text
- Indicates: Under active development, expect frequent updates
- Best for: New projects or major rewrites

### ⚫ Archived (Gray)
- Background: Light gray
- Badge: Gray with white text
- Indicates: No longer maintained, use with caution
- Best for: Legacy projects or replaced projects

## Usage Examples

### Basic Usage in React Component

```tsx
import RepositoryBadges from '@/components/RepositoryBadges';

export default function MyProjects() {
  const repos = [
    {
      name: 'awesome-tool',
      url: 'https://github.com/username/awesome-tool',
      description: 'A fantastic CLI tool for developers',
      topics: ['typescript', 'cli', 'devops'],
      status: 'maintained',
    },
  ];

  return <RepositoryBadges repositories={repos} />;
}
```

### In MDX Documents

```mdx
# My Projects

<RepositoryBadges
  repositories={[
    {
      name: 'project-one',
      url: 'https://github.com/user/project-one',
      description: 'First amazing project',
      topics: ['react', 'typescript'],
      status: 'maintained',
    },
    {
      name: 'project-two',
      url: 'https://github.com/user/project-two',
      description: 'Second project',
      topics: ['rust', 'cli'],
      status: 'in-progress',
    },
  ]}
/>
```

## Adding Your Repositories

To add more repositories to your home page, edit `src/app/(home)/page.tsx`:

```tsx
const maintainedRepositories = [
  {
    name: 'personal-fumadocs-site',
    url: 'https://github.com/RelativeSure/websites',
    description: 'Personal documentation and portfolio site built with Fumadocs and Next.js',
    topics: ['fumadocs', 'next.js', 'documentation', 'portfolio'],
    status: 'maintained',
  },
  // Add your new repository here:
  {
    name: 'your-new-repo',
    url: 'https://github.com/RelativeSure/your-new-repo',
    description: 'What this project does',
    topics: ['tag1', 'tag2', 'tag3'],
    status: 'maintained', // or 'in-progress' or 'archived'
  },
];
```

## Best Practices

### Topics/Tags
- Keep topics short (typically 1-3 words each)
- Use lowercase, no spaces
- Use common technology names (e.g., `typescript`, `kubernetes`, `docker`)
- Maximum recommended: 5-7 topics per repository

### Descriptions
- Keep it concise (1 sentence is ideal)
- Be specific about what the project does
- Avoid marketing language, be factual
- Example good descriptions:
  - ✅ "CLI tool for managing Kubernetes deployments"
  - ✅ "Python automation framework for system administration"
  - ❌ "Amazing and super cool project"
  - ❌ "This is a project that does things"

### Status Assignment
- `maintained`: Active projects you regularly update
- `in-progress`: Projects you're currently working on
- `archived`: Projects you no longer maintain (but want to keep visible for reference)

### Repository Organization
- Put most important/featured projects first
- Group related projects together when possible
- Alternate between maintained and archived to break up visual flow

## Styling & Customization

The component uses Tailwind CSS classes that automatically respect your theme:

### Light Mode
- Background: Soft, muted colors
- Text: Dark text on light background
- Badges: Colored backgrounds with contrast text

### Dark Mode
- Background: Darker muted colors with better contrast
- Text: Light text on dark background
- Badges: Adjusted colors for dark mode visibility

All styling is automatically responsive and works on:
- ✅ Desktop (3+ projects can use multi-column layouts if needed)
- ✅ Tablet (2-column layout)
- ✅ Mobile (Single column, full-width)

## Advanced: Creating Derived Data

If you have many repositories, you can fetch data from GitHub API:

```tsx
async function getRepositories() {
  const response = await fetch('https://api.github.com/users/RelativeSure/repos');
  const repos = await response.json();
  
  return repos
    .filter(repo => !repo.archived) // Only show active repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
    .slice(0, 10) // Top 10
    .map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      topics: repo.topics,
      status: 'maintained' as const,
    }));
}
```

## Accessibility

The component includes:
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ ARIA labels where appropriate
- ✅ Keyboard navigation support
- ✅ High contrast colors for readability
- ✅ Screen reader friendly

## Troubleshooting

### Topics not showing?
Make sure the `topics` array is not empty and contains valid strings.

### Status badge not the right color?
Ensure `status` is one of: `'maintained'`, `'in-progress'`, or `'archived'`. Default is `'maintained'`.

### Links not working?
Verify the `url` is a complete GitHub repository URL starting with `https://github.com/`

### Component not rendering?
Make sure the component is imported in your MDX components:
```tsx
// src/mdx-components.tsx
import RepositoryBadges from '@/components/RepositoryBadges';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // ... other components
    RepositoryBadges,
  };
}
```

## Related Components

Other fumadocs components that work well with `RepositoryBadges`:

- **Cards**: For creating grids of content
- **Card**: Individual content cards
- **Callout**: For highlighting important information about projects
- **Accordion**: For FAQs about your projects
- **Tabs**: For filtering projects by category or language

## Tips & Tricks

### Showcase Your Best Work
Put your most impressive or most-used projects first - they'll get the most visibility.

### Tell a Story
Order your projects chronologically or by category to show your growth and interests.

### Keep It Updated
Regular updates to the repository list show you're actively maintaining your work.

### Link to Documentation
Consider creating full documentation pages in MDX for your major projects and linking from descriptions.
