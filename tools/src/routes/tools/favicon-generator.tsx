import { createFileRoute } from '@tanstack/react-router'
import FaviconGeneratorPage from '../../pages/tools/FaviconGeneratorPage'

export const Route = createFileRoute('/tools/favicon-generator')({
  component: FaviconGeneratorPage,
})
