import { createFileRoute } from '@tanstack/react-router'
import CipherPage from '../../../pages/tools/encoders/CipherPage'

export const Route = createFileRoute('/_tools/encoders/cipher')({
  component: CipherPage,
})
