import { createFileRoute } from '@tanstack/react-router'
import HashPage from '../../../pages/tools/crypto/HashPage'

export const Route = createFileRoute('/tools/crypto/hash')({
  component: HashPage,
})
