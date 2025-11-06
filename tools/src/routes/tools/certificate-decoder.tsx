import { createFileRoute } from '@tanstack/react-router'
import CertificateDecoderPage from '../../pages/tools/CertificateDecoderPage'

export const Route = createFileRoute('/tools/certificate-decoder')({
  component: CertificateDecoderPage,
})
