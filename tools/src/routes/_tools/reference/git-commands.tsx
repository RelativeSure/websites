import { createFileRoute } from '@tanstack/react-router'
import GitCommandsPage from '../../../pages/tools/reference/GitCommandsPage'

export const Route = createFileRoute('/_tools/reference/git-commands')({
  component: GitCommandsPage,
})
