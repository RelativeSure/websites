import { createFileRoute } from '@tanstack/react-router'
import TotpPage from '../../../pages/tools/crypto/TotpPage'

export const Route = createFileRoute('/_tools/crypto/totp')({
  component: TotpPage,
})
