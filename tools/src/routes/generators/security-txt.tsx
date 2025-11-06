import { createFileRoute } from '@tanstack/react-router'
import SecurityTxtPage from '../../pages/tools/generators/SecurityTxtPage'

export const Route = createFileRoute('/generators/security-txt')({
  component: SecurityTxtPage,
})
