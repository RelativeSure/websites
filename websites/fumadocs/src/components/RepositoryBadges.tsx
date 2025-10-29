import Link from 'next/link';

export interface Repository {
  name: string;
  url: string;
  description: string;
  topics?: string[];
  status?: 'maintained' | 'archived' | 'in-progress';
}

interface RepositoryBadgesProps {
  repositories: Repository[];
}

const statusColors: Record<string, { bg: string; text: string; badge: string }> = {
  maintained: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-900 dark:text-green-100',
    badge: 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-100',
  },
  'in-progress': {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-900 dark:text-blue-100',
    badge: 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-100',
  },
  archived: {
    bg: 'bg-gray-50 dark:bg-gray-950',
    text: 'text-gray-900 dark:text-gray-100',
    badge: 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100',
  },
};

export default function RepositoryBadges({ repositories }: RepositoryBadgesProps) {
  if (!repositories || !Array.isArray(repositories) || repositories.length === 0) {
    return <p className="text-muted-foreground">No repositories to display.</p>;
  }

  return (
    <div className="space-y-4">
      {repositories.map((repo, index) => {
        const status = repo.status || 'maintained';
        const colors = statusColors[status];

        return (
          <div
            key={index}
            className={`p-4 rounded-lg border border-border ${colors.bg}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lg hover:underline text-primary"
                  >
                    {repo.name}
                  </Link>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${colors.badge}`}
                  >
                    {status.replace('-', ' ')}
                  </span>
                </div>
                <p className={`text-sm mb-3 ${colors.text}`}>{repo.description}</p>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="inline-block px-2 py-1 text-xs bg-accent rounded text-muted-foreground"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm font-medium rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                View Repo
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
