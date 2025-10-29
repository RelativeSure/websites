# Quick Start - Repository Badges

## TL;DR - Add More Repositories in 30 Seconds

### Step 1: Open the file
```
websites/fumadocs/src/app/(home)/page.tsx
```

### Step 2: Find this section (around line 8-21)
```tsx
const maintainedRepositories = [
  {
    name: 'personal-fumadocs-site',
    url: 'https://github.com/RelativeSure/websites',
    description: 'Personal documentation and portfolio site built with Fumadocs and Next.js',
    topics: ['fumadocs', 'next.js', 'documentation', 'portfolio'],
    status: 'maintained' as const,
  },
  {
    name: 'personal-starlight-site',
    url: 'https://github.com/RelativeSure/personal-starlight-site',
    description: 'Archived Starlight documentation site',
    topics: ['starlight', 'astro', 'documentation'],
    status: 'archived' as const,
  },
];
```

### Step 3: Add your repository
```tsx
const maintainedRepositories = [
  // ... existing repos ...
  
  // ADD THIS:
  {
    name: 'your-awesome-project',
    url: 'https://github.com/RelativeSure/your-awesome-project',
    description: 'One sentence description of what it does',
    topics: ['tag1', 'tag2', 'tag3'],
    status: 'maintained' as const,  // or 'in-progress' or 'archived'
  },
];
```

### Step 4: Done! 🎉
Save the file and your repository will appear on the home page.

---

## How to Fill Out Each Field

### `name` (Required)
The repository name as it appears on GitHub.

```tsx
name: 'my-tool'           // ✅ Good
name: 'MyTool'            // ✅ Also fine
name: 'my-awesome-tool'   // ✅ Great
```

### `url` (Required)
The full GitHub repository URL. Must start with `https://github.com/`

```tsx
url: 'https://github.com/RelativeSure/my-project'           // ✅ Correct
url: 'github.com/RelativeSure/my-project'                   // ❌ Missing https://
url: 'https://github.com/RelativeSure/my-project/'          // ✅ Trailing slash OK
url: 'https://github.com/RelativeSure/my-project#readme'    // ❌ Don't include hash
```

### `description` (Required)
A short, one-line description of what the project does.

```tsx
description: 'CLI tool for deploying to Kubernetes'     // ✅ Perfect
description: 'Tool'                                       // ⚠️ Too vague
description: 'An absolutely amazing tool that does...'   // ❌ Too long
```

### `topics` (Optional but Recommended)
Array of technology tags. Use lowercase, no spaces.

```tsx
topics: ['kubernetes', 'devops', 'cli']        // ✅ Good
topics: ['TypeScript', 'Next.js', 'React']     // ⚠️ Will work but should be lowercase
topics: ['machine-learning']                    // ✅ Hyphens are OK
topics: []                                      // ✅ Empty is fine
```

**Common topics to use:**
- Languages: `typescript`, `python`, `rust`, `go`, `javascript`
- Frameworks: `react`, `next.js`, `astro`, `vue`
- DevOps: `kubernetes`, `docker`, `terraform`, `ansible`
- Other: `cli`, `devops`, `automation`, `documentation`

### `status` (Optional, defaults to 'maintained')
The status of the project. Must be one of three options:

```tsx
status: 'maintained'     // ✅ Currently maintained, bugs are fixed, features added
status: 'in-progress'    // ✅ Under active development, frequent updates
status: 'archived'       // ✅ No longer maintained, preserved for reference

// If you don't specify, it defaults to 'maintained':
{ name: 'my-project', /* ... */ }  // ← Treated as 'maintained'
```

**Color Reference:**
- 🟢 `maintained` → Green background
- 🔵 `in-progress` → Blue background  
- ⚫ `archived` → Gray background

---

## Complete Examples

### Example 1: A TypeScript DevOps Tool (Maintained)
```tsx
{
  name: 'helm-deployer',
  url: 'https://github.com/RelativeSure/helm-deployer',
  description: 'Automated Helm chart deployment and versioning tool',
  topics: ['typescript', 'kubernetes', 'helm', 'devops', 'cli'],
  status: 'maintained' as const,
}
```

### Example 2: A Python Project (In Progress)
```tsx
{
  name: 'network-monitor',
  url: 'https://github.com/RelativeSure/network-monitor',
  description: 'Real-time network performance monitoring dashboard',
  topics: ['python', 'networking', 'monitoring', 'dashboard'],
  status: 'in-progress' as const,
}
```

### Example 3: A Legacy Project (Archived)
```tsx
{
  name: 'legacy-deployment-tool',
  url: 'https://github.com/RelativeSure/legacy-deployment-tool',
  description: 'Original deployment tool (superseded by helm-deployer)',
  topics: ['bash', 'deployment', 'legacy'],
  status: 'archived' as const,
}
```

### Example 4: Minimal (Just Required Fields)
```tsx
{
  name: 'simple-tool',
  url: 'https://github.com/RelativeSure/simple-tool',
  description: 'A helpful tool',
  // No topics
  // Status defaults to 'maintained'
}
```

---

## What The User Sees

When you add a repository, visitors to your site will see a card like this:

```
┌─────────────────────────────────────────────────────────┐
│ helm-deployer                              [maintained]  │
│ Automated Helm chart deployment and versioning tool    │
│                                                         │
│ #typescript #kubernetes #helm #devops #cli    View Repo│
└─────────────────────────────────────────────────────────┘
```

- ✅ Repository name is a clickable link to GitHub
- ✅ Status badge shows at a glance
- ✅ Description explains what it does
- ✅ Topics show relevant technologies
- ✅ "View Repo" button opens repository

---

## Tips for Great Repository Cards

### ✅ DO
- Keep descriptions to one sentence
- Use real topics from the project
- Update status when projects change
- Order projects by importance/interest
- Keep project names consistent with GitHub

### ❌ DON'T
- Write long descriptions (won't fit)
- Use capitalized topics (`Typescript` → `typescript`)
- Mark every project as "maintained"
- Add projects you don't want to maintain
- Include markdown or special characters in descriptions

---

## Order Matters

Repositories appear in the order you list them. Put your best/most important projects first:

```tsx
const maintainedRepositories = [
  // 1. Your BEST project - most visible
  { name: 'flagship-project', ... },
  
  // 2. Other important projects
  { name: 'critical-tool', ... },
  { name: 'useful-library', ... },
  
  // 3. Archived projects at the end
  { name: 'legacy-project', status: 'archived', ... },
];
```

---

## Verify It Works

After adding a repository:

1. Save the file
2. The site will hot-reload (if running `npm run dev`)
3. Scroll to the bottom of your home page
4. You should see your new repository card
5. Click the "View Repo" button to verify the link works

---

## Need More Repositories?

You can have as many as you want! Just keep adding to the array:

```tsx
const maintainedRepositories = [
  { ... },  // 1st repo
  { ... },  // 2nd repo
  { ... },  // 3rd repo
  { ... },  // 4th repo - as many as you want!
  { ... },  // 5th repo
  { ... },  // etc...
];
```

They'll all display beautifully and maintain proper spacing.

---

## Using in MDX Documents

You can also use repository badges in any `.mdx` documentation file:

```mdx
# My Open Source Projects

<RepositoryBadges
  repositories={[
    {
      name: 'awesome-cli',
      url: 'https://github.com/RelativeSure/awesome-cli',
      description: 'Command-line interface for managing infrastructure',
      topics: ['cli', 'devops', 'rust'],
      status: 'maintained',
    },
  ]}
/>

This is my main open source project!
```

---

## Questions?

Check out these guides in the same directory:
- `REPOSITORY_BADGES_GUIDE.md` - Visual guide with detailed examples
- `COMPONENTS_REFERENCE.md` - Technical reference for all components
- `IMPROVEMENTS.md` - Details about what was changed

Or visit: [Fumadocs Documentation](https://fumadocs.vercel.app)

---

## Summary

You now have:
- ✅ Fixed GitHub link pointing to the right repo
- ✅ Beautiful repository showcase cards
- ✅ Status indicators for project health
- ✅ Technology tags to show your skills
- ✅ Easy way to add more projects

Get started by adding your repositories to the array above. Takes 2 minutes! 🚀
