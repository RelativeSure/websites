import { createFileRoute } from '@tanstack/react-router'
import SecretsGeneratorPage from '../../pages/tools/SecretsGeneratorPage'

export const Route = createFileRoute('/tools/secrets-generator')({
  component: SecretsGeneratorPage,
})
