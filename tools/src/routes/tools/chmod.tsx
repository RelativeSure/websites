import { createFileRoute } from '@tanstack/react-router'
import ChmodPage from '../../pages/tools/ChmodPage'

export const Route = createFileRoute('/tools/chmod')({
  component: ChmodPage,
})
