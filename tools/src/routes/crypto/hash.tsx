import { createFileRoute } from '@tanstack/react-router'
import HashPage from '../../pages/tools/crypto/HashPage'

export const Route = createFileRoute('/crypto/hash')({
  component: HashPage,
})
