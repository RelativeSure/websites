import { createFileRoute } from '@tanstack/react-router'
import BcryptPage from '../../../pages/tools/crypto/BcryptPage'

export const Route = createFileRoute('/tools/crypto/bcrypt')({
  component: BcryptPage,
})
