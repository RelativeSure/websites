import { Card } from 'fumadocs-ui/components/card';

interface BookmarkProps {
  url: string;
  title: string;
  description?: string;
}

export function Bookmark({ url, title, description }: BookmarkProps) {
  const isExternal = url.startsWith('http://') || url.startsWith('https://');

  return (
    <Card
      title={title}
      href={url}
      description={description}
      external={isExternal}
    />
  );
}
