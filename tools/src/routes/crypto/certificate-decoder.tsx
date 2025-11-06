import { createFileRoute } from '@tanstack/react-router'
import CertificateDecoderPage from '../../pages/tools/crypto/CertificateDecoderPage'

export const Route = createFileRoute('/crypto/certificate-decoder')({
  component: CertificateDecoderPage,
})
