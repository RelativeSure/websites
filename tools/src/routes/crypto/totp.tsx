import { createFileRoute } from '@tanstack/react-router'
import TotpPage from '../../pages/tools/crypto/TotpPage'

export const Route = createFileRoute('/crypto/totp')({
  component: TotpPage,
})
