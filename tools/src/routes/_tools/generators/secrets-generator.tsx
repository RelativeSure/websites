import { createFileRoute } from '@tanstack/react-router'
import SecretsGeneratorPage from '../../../pages/tools/generators/SecretsGeneratorPage'

export const Route = createFileRoute('/_tools/generators/secrets-generator')({
  component: SecretsGeneratorPage,
})
