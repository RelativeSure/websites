import { createFileRoute } from '@tanstack/react-router'
import TotpPage from '../../pages/tools/TotpPage'

export const Route = createFileRoute('/tools/totp')({
  component: TotpPage,
})
