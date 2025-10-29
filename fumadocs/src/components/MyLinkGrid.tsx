import { Card, Cards } from 'fumadocs-ui/components/card';

export interface LinkItem {
  title: string;
  href: string;
  description?: string;
  target?: string;
}

interface MyLinkGridProps {
  links: LinkItem[];
  gridTitle?: string;
}

export default function MyLinkGrid({ links, gridTitle }: MyLinkGridProps) {
  if (!links || !Array.isArray(links) || links.length === 0) {
    return <p>No links to display.</p>;
  }

  return (
    <>
      {gridTitle && <h2 className="text-2xl font-bold mb-4">{gridTitle}</h2>}
      <Cards>
        {links.map((link, index) => (
          <Card
            key={index}
            title={link.title}
            href={link.href}
            description={link.description}
          />
        ))}
      </Cards>
    </>
  );
}
