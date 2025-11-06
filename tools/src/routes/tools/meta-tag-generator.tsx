import { createFileRoute } from '@tanstack/react-router'
import MetaTagGeneratorPage from '../../pages/tools/MetaTagGeneratorPage'

export const Route = createFileRoute('/tools/meta-tag-generator')({
  component: MetaTagGeneratorPage,
})
