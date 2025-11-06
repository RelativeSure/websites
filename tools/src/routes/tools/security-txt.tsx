import { createFileRoute } from '@tanstack/react-router'
import SecurityTxtPage from '../../pages/tools/SecurityTxtPage'

export const Route = createFileRoute('/tools/security-txt')({
  component: SecurityTxtPage,
})
