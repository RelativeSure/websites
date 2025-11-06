import { createFileRoute } from '@tanstack/react-router'
import QrCodePage from '../../pages/tools/generators/QrCodePage'

export const Route = createFileRoute('/generators/qr-code')({
  component: QrCodePage,
})
