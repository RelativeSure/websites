import { createFileRoute } from '@tanstack/react-router'
import OpenGraphPreviewPage from '../../pages/tools/OpenGraphPreviewPage'

export const Route = createFileRoute('/tools/open-graph-preview')({
  component: OpenGraphPreviewPage,
})
