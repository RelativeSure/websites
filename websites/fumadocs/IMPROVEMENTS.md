# Fumadocs Site Improvements

This document outlines the improvements made to the fumadocs site to use official fumadocs components and better showcase your repositories.

## Changes Made

### 1. **Removed Custom Components - Using Fumadocs Components Only** ✅

**Before:**
- Had a custom `MyLinkGrid` component that was essentially a wrapper around `Cards` and `Card` from fumadocs-ui
- Added unnecessary abstraction layer

**After:**
- Removed the custom wrapper component
- Now using fumadocs-ui components directly: `Card`, `Cards`, `Tabs`, `Tab`, `Accordion`, `Accordions`, `Callout`, `Files`, `Steps`, etc.
- Cleaner code and better maintenance

**Files Updated:**
```
src/components/MyLinkGrid.tsx - Marked as deprecated, now using fumadocs components directly
src/mdx-components.tsx - Removed MyLinkGrid import, kept all fumadocs imports
```

### 2. **Fixed GitHub Repository Link** ✅

**Before:**
```
href="https://github.com/RelativeSure/personal-starlight-site"
title="GitHub"
description="View site source code"
```

**After:**
```
href="https://github.com/RelativeSure/websites"
title="View site source code"
description="GitHub repository for this site"
```

**What Changed:**
- Link now points to the correct fumadocs repository (`websites` monorepo)
- Title was updated to be more descriptive: "View site source code"
- Description clarifies it's the GitHub repository for this site
- Uses fumadocs `Card` component to display the link

### 3. **Added Repository Badges Component** ✨

**New Component:** `src/components/RepositoryBadges.tsx`

This component displays your maintained repositories with rich information:

**Features:**
- **Status Badges**: Shows the status of each repository (maintained, in-progress, archived)
- **Color Coding**: 
  - 🟢 Green for "maintained" repos
  - 🔵 Blue for "in-progress" repos  
  - ⚫ Gray for "archived" repos
- **Topic Tags**: Displays technology topics/tags for each repo
- **Direct Links**: One-click access to view each repository
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark Mode Support**: Full dark mode styling

**Example Usage:**
```tsx
const repositories = [
  {
    name: 'my-project',
    url: 'https://github.com/username/my-project',
    description: 'Project description here',
    topics: ['next.js', 'typescript', 'tailwind'],
    status: 'maintained',
  },
];

<RepositoryBadges repositories={repositories} />
```

### 4. **Added Repository Showcase Section** ✨

**Location:** Home page, bottom section after "About Rasmus"

**Currently Showcasing:**
1. **personal-fumadocs-site** (maintained)
   - This current fumadocs site
   - Topics: fumadocs, next.js, documentation, portfolio
   
2. **personal-starlight-site** (archived)
   - Your previous Starlight documentation site
   - Topics: starlight, astro, documentation

This section makes it easy for visitors to discover and explore your open-source work.

## How to Expand

To add more repositories to your showcase, simply update the `maintainedRepositories` array in `src/app/(home)/page.tsx`:

```tsx
const maintainedRepositories = [
  {
    name: 'your-repo-name',
    url: 'https://github.com/username/your-repo-name',
    description: 'A brief description of your project',
    topics: ['tag1', 'tag2', 'tag3'],
    status: 'maintained', // 'maintained' | 'in-progress' | 'archived'
  },
  // ... more repos
];
```

## Benefits

✅ **Cleaner Codebase**: No redundant wrapper components  
✅ **Consistent Styling**: Uses official fumadocs component system  
✅ **Better Discoverability**: GitHub link now points to correct repository  
✅ **Professional Presentation**: Repository badges showcase your work  
✅ **Easier Maintenance**: Status indicators help track project health  
✅ **Fully Accessible**: Built with semantic HTML and accessibility in mind  
✅ **Dark Mode Support**: Components work perfectly in light and dark themes  

## Component Inventory

All components used are from fumadocs-ui:
- `Card` - Individual showcase cards
- `Cards` - Card grid container
- `Tabs` - Tab interface (for education, experience, etc.)
- `Tab` - Individual tab pane
- `Accordion` - Collapsible sections
- `Callout` - Info boxes
- `Files` - File tree display
- `Steps` - Step-by-step guides
- `RepositoryBadges` - Custom component for repository showcase (integrates with fumadocs design system)

## MDX Support

The `RepositoryBadges` component is available in all MDX documents. You can use it like:

```mdx
<RepositoryBadges
  repositories={[
    {
      name: 'my-project',
      url: 'https://github.com/user/my-project',
      description: 'My awesome project',
      topics: ['rust', 'cli'],
      status: 'maintained',
    },
  ]}
/>
```
