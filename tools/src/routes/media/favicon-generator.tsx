import { createFileRoute } from '@tanstack/react-router'
import FaviconGeneratorPage from '../../pages/tools/media/FaviconGeneratorPage'

export const Route = createFileRoute('/media/favicon-generator')({
  component: FaviconGeneratorPage,
})
