import { createFileRoute } from '@tanstack/react-router'
import ManifestGeneratorPage from '../../pages/tools/ManifestGeneratorPage'

export const Route = createFileRoute('/tools/manifest-generator')({
  component: ManifestGeneratorPage,
})
