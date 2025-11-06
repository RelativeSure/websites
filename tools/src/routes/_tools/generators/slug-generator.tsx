import { createFileRoute } from '@tanstack/react-router'
import SlugGeneratorPage from '../../../pages/tools/generators/SlugGeneratorPage'

export const Route = createFileRoute('/_tools/generators/slug-generator')({
  component: SlugGeneratorPage,
})
