# Fumadocs Components Reference

This site uses **only** official fumadocs-ui components. No custom component wrappers.

## Available Components

### Layout Components

#### `Card` & `Cards`
Display content in card layouts.

```tsx
import { Card, Cards } from 'fumadocs-ui/components/card';

export function Example() {
  return (
    <Cards>
      <Card
        href="/docs/page"
        title="Card Title"
        description="Card description"
      />
    </Cards>
  );
}
```

#### `Accordion` & `Accordions`
Collapsible content sections.

```tsx
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export function Example() {
  return (
    <Accordions>
      <Accordion title="Section 1">
        Content here
      </Accordion>
    </Accordions>
  );
}
```

#### `Tabs` & `Tab`
Tabbed interface for switching between content.

```tsx
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

export function Example() {
  return (
    <Tabs items={['Tab 1', 'Tab 2']}>
      <Tab value="Tab 1">Content 1</Tab>
      <Tab value="Tab 2">Content 2</Tab>
    </Tabs>
  );
}
```

### Content Components

#### `Callout`
Highlighted information boxes.

```tsx
import { Callout } from 'fumadocs-ui/components/callout';

export function Example() {
  return (
    <Callout type="info" title="Note">
      Important information here
    </Callout>
  );
}
```

Types: `info`, `warn`, `error`

#### `File`, `Folder`, `Files`
Display file structure/tree.

```tsx
import { File, Folder, Files } from 'fumadocs-ui/components/files';

export function Example() {
  return (
    <Files>
      <Folder name="src">
        <File name="index.ts" />
      </Folder>
    </Files>
  );
}
```

#### `Step` & `Steps`
Display step-by-step instructions.

```tsx
import { Step, Steps } from 'fumadocs-ui/components/steps';

export function Example() {
  return (
    <Steps>
      <Step>First step</Step>
      <Step>Second step</Step>
    </Steps>
  );
}
```

### Custom Components

#### `RepositoryBadges`
Display your maintained repositories with status indicators.

```tsx
import RepositoryBadges from '@/components/RepositoryBadges';

export function Example() {
  return (
    <RepositoryBadges
      repositories={[
        {
          name: 'my-project',
          url: 'https://github.com/user/my-project',
          description: 'Project description',
          topics: ['typescript', 'react'],
          status: 'maintained',
        },
      ]}
    />
  );
}
```

Status: `'maintained'` | `'in-progress'` | `'archived'`

## Usage in MDX

All components are registered in `src/mdx-components.tsx` and available in all `.mdx` files:

### Example MDX File

```mdx
# My Documentation

<Callout type="info">
This is important!
</Callout>

## Features

<Steps>
  <Step>Install the package</Step>
  <Step>Import components</Step>
  <Step>Use in your code</Step>
</Steps>

## Project Structure

<Files>
  <Folder name="src">
    <File name="index.ts" />
    <File name="utils.ts" />
  </Folder>
</Files>

## FAQ

<Accordions>
  <Accordion title="How do I use this?">
    Instructions here...
  </Accordion>
</Accordions>

## Comparison

<Tabs items={["Option A", "Option B"]}>
  <Tab value="Option A">
    Details for option A
  </Tab>
  <Tab value="Option B">
    Details for option B
  </Tab>
</Tabs>

## My Projects

<RepositoryBadges
  repositories={[
    {
      name: 'my-tool',
      url: 'https://github.com/user/my-tool',
      description: 'Useful tool',
      topics: ['cli'],
      status: 'maintained',
    },
  ]}
/>
```

## Component Locations

All components are imported from:
- **Layout**: `fumadocs-ui/components/{name}`
- **MDX Components**: Already registered in `src/mdx-components.tsx`
- **Custom**: `src/components/{ComponentName}`

## Styling

All components use:
- ✅ Tailwind CSS for styling
- ✅ CSS variables for theming
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Accessibility best practices

## Documentation

For official fumadocs documentation:
- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [UI Components](https://fumadocs.vercel.app/docs/ui)
- [MDX Components](https://fumadocs.vercel.app/docs/ui/mdx)

## Quick Tips

### Cards
- Use `href` for navigation links
- Use `external` prop for external links
- Support `icon` prop for custom icons

### Tabs
- Pass array of strings to `items` prop
- Tab values must match `<Tab value="..." />`
- Active tab persists on page

### Callout
- Use `type` prop: `'info'`, `'warn'`, or `'error'`
- Optional `title` prop
- Great for notes, warnings, tips

### Steps
- Great for tutorials and guides
- Numbered automatically
- No configuration needed

### Files
- Supports unlimited nesting
- Use `name` prop for labels
- `<Folder>` for directories
- `<File>` for files

## Removed Components

The following were removed as they were custom wrappers:
- `MyLinkGrid` - Use `Card` & `Cards` instead

All unused custom components have been removed to keep the codebase clean and maintainable.

## Adding New Components

To add a new fumadocs component:

1. Import in `src/mdx-components.tsx`:
   ```tsx
   import { NewComponent } from 'fumadocs-ui/components/new-component';
   ```

2. Add to `getMDXComponents`:
   ```tsx
   export function getMDXComponents(components?: MDXComponents): MDXComponents {
     return {
       ...defaultMdxComponents,
       // ... other components
       NewComponent,
     };
   }
   ```

3. Use in MDX files:
   ```mdx
   <NewComponent prop="value" />
   ```

## Component Status Matrix

| Component | Type | MDX Support | TypeScript | Responsive | Dark Mode |
|-----------|------|-------------|-----------|------------|-----------|
| Card      | Layout | ✅ | ✅ | ✅ | ✅ |
| Cards     | Layout | ✅ | ✅ | ✅ | ✅ |
| Tabs      | Layout | ✅ | ✅ | ✅ | ✅ |
| Accordion | Layout | ✅ | ✅ | ✅ | ✅ |
| Callout   | Content | ✅ | ✅ | ✅ | ✅ |
| Files     | Content | ✅ | ✅ | ✅ | ✅ |
| Steps     | Content | ✅ | ✅ | ✅ | ✅ |
| RepositoryBadges | Custom | ✅ | ✅ | ✅ | ✅ |

## Support

For issues or questions about fumadocs components:
- Check [fumadocs docs](https://fumadocs.vercel.app)
- Review existing usage in this site
- Check component source in `node_modules/fumadocs-ui`
