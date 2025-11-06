import { createFileRoute } from '@tanstack/react-router'
import HmacPage from '../../../pages/tools/crypto/HmacPage'

export const Route = createFileRoute('/_tools/crypto/hmac')({
  component: HmacPage,
})
