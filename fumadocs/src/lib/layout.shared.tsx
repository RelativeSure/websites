import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Rasmus Jørgensen',
    },
    links: [
      {
        text: 'GitHub',
        url: 'https://github.com/RelativeSure',
        external: true,
      },
      {
        text: 'LinkedIn',
        url: 'https://www.linkedin.com/in/rasmusbroeggerjoergensen/',
        external: true,
      },
    ],
  };
}
