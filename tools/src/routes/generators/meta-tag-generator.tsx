import { createFileRoute } from '@tanstack/react-router'
import MetaTagGeneratorPage from '../../pages/tools/generators/MetaTagGeneratorPage'

export const Route = createFileRoute('/generators/meta-tag-generator')({
  component: MetaTagGeneratorPage,
})
