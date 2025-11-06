import { createFileRoute } from '@tanstack/react-router'
import TextToolsPage from '../../pages/tools/TextToolsPage'

export const Route = createFileRoute('/tools/text-tools')({
  component: TextToolsPage,
})
