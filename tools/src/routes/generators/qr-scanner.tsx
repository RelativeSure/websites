import { createFileRoute } from '@tanstack/react-router'
import QrScannerPage from '../../pages/tools/generators/QrScannerPage'

export const Route = createFileRoute('/generators/qr-scanner')({
  component: QrScannerPage,
})
