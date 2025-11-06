import { createFileRoute } from '@tanstack/react-router'
import DiffPage from '../../../pages/tools/text-tools/DiffPage'

export const Route = createFileRoute('/tools/text-tools/diff')({
  component: DiffPage,
})
