import { createFileRoute } from '@tanstack/react-router'
import MarkdownToHtmlPage from '../../pages/tools/MarkdownToHtmlPage'

export const Route = createFileRoute('/tools/markdown-to-html')({
  component: MarkdownToHtmlPage,
})
