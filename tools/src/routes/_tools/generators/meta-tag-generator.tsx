import { createFileRoute } from '@tanstack/react-router'
import MetaTagGeneratorPage from '../../../pages/tools/generators/MetaTagGeneratorPage'

export const Route = createFileRoute('/_tools/generators/meta-tag-generator')({
  component: MetaTagGeneratorPage,
})
