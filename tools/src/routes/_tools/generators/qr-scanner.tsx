import { createFileRoute } from '@tanstack/react-router'
import QrScannerPage from '../../../pages/tools/generators/QrScannerPage'

export const Route = createFileRoute('/_tools/generators/qr-scanner')({
  component: QrScannerPage,
})
