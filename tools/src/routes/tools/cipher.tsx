import { createFileRoute } from '@tanstack/react-router'
import CipherPage from '../../pages/tools/CipherPage'

export const Route = createFileRoute('/tools/cipher')({
  component: CipherPage,
})
