import { createFileRoute } from '@tanstack/react-router'
import HmacPage from '../../pages/tools/HmacPage'

export const Route = createFileRoute('/tools/hmac')({
  component: HmacPage,
})
