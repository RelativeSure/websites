import { createFileRoute } from '@tanstack/react-router'
import OpenGraphPreviewPage from '../../../pages/tools/generators/OpenGraphPreviewPage'

export const Route = createFileRoute('/tools/generators/open-graph-preview')({
  component: OpenGraphPreviewPage,
})
