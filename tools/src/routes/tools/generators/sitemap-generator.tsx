import { createFileRoute } from '@tanstack/react-router'
import SitemapGeneratorPage from '../../../pages/tools/generators/SitemapGeneratorPage'

export const Route = createFileRoute('/tools/generators/sitemap-generator')({
  component: SitemapGeneratorPage,
})
