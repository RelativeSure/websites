import { createFileRoute } from '@tanstack/react-router'
import HashPage from '../../pages/tools/HashPage'

export const Route = createFileRoute('/tools/hash')({
  component: HashPage,
})
