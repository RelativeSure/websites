import { createFileRoute } from '@tanstack/react-router'
import MetaTagGeneratorPage from '../../../pages/tools/generators/MetaTagGeneratorPage'

export const Route = createFileRoute('/tools/generators/meta-tag-generator')({
  component: MetaTagGeneratorPage,
})
