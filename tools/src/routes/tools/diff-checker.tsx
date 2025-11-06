import { createFileRoute } from '@tanstack/react-router'
import DiffCheckerPage from '../../pages/tools/DiffCheckerPage'

export const Route = createFileRoute('/tools/diff-checker')({
  component: DiffCheckerPage,
})
