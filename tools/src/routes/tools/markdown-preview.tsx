import { createFileRoute } from '@tanstack/react-router'
import MarkdownPreviewPage from '../../pages/tools/MarkdownPreviewPage'

export const Route = createFileRoute('/tools/markdown-preview')({
  component: MarkdownPreviewPage,
})
