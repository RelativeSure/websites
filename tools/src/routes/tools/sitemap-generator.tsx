import { createFileRoute } from '@tanstack/react-router'
import SitemapGeneratorPage from '../../pages/tools/SitemapGeneratorPage'

export const Route = createFileRoute('/tools/sitemap-generator')({
  component: SitemapGeneratorPage,
})
