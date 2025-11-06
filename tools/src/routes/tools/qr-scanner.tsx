import { createFileRoute } from '@tanstack/react-router'
import QrScannerPage from '../../pages/tools/QrScannerPage'

export const Route = createFileRoute('/tools/qr-scanner')({
  component: QrScannerPage,
})
