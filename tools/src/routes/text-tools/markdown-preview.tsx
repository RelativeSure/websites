import { createFileRoute } from '@tanstack/react-router'
import MarkdownPreviewPage from '../../pages/tools/text-tools/MarkdownPreviewPage'

export const Route = createFileRoute('/text-tools/markdown-preview')({
  component: MarkdownPreviewPage,
})
