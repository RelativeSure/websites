import { createFileRoute } from '@tanstack/react-router'
import SlugGeneratorPage from '../../pages/tools/SlugGeneratorPage'

export const Route = createFileRoute('/tools/slug-generator')({
  component: SlugGeneratorPage,
})
