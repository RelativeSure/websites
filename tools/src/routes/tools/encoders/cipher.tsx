import { createFileRoute } from '@tanstack/react-router'
import CipherPage from '../../../pages/tools/encoders/CipherPage'

export const Route = createFileRoute('/tools/encoders/cipher')({
  component: CipherPage,
})
