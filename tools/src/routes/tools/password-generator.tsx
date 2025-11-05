import { createFileRoute } from '@tanstack/react-router'
import PasswordGeneratorPage from '../../pages/tools/PasswordGeneratorPage'

export const Route = createFileRoute('/tools/password-generator')({
  component: PasswordGeneratorPage,
})
