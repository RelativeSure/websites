import { createFileRoute } from '@tanstack/react-router'
import BcryptPage from '../../pages/tools/BcryptPage'

export const Route = createFileRoute('/tools/bcrypt')({
  component: BcryptPage,
})
