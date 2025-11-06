import { createFileRoute } from '@tanstack/react-router'
import ManifestGeneratorPage from '../../pages/tools/generators/ManifestGeneratorPage'

export const Route = createFileRoute('/generators/manifest-generator')({
  component: ManifestGeneratorPage,
})
