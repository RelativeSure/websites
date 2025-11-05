import { createFileRoute } from '@tanstack/react-router'
import QrCodePage from '../../pages/tools/QrCodePage'

export const Route = createFileRoute('/tools/qr-code')({
  component: QrCodePage,
})
