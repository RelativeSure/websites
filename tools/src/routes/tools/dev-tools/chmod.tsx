import { createFileRoute } from '@tanstack/react-router'
import ChmodPage from '../../../pages/tools/dev-tools/ChmodPage'

export const Route = createFileRoute('/tools/dev-tools/chmod')({
  component: ChmodPage,
})
