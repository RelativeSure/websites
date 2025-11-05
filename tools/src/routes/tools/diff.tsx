import { createFileRoute } from '@tanstack/react-router'
import DiffPage from '../../pages/tools/DiffPage'

export const Route = createFileRoute('/tools/diff')({
  component: DiffPage,
})
