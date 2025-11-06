import { createFileRoute } from '@tanstack/react-router'
import MarkdownToHtmlPage from '../../../pages/tools/converters/MarkdownToHtmlPage'

export const Route = createFileRoute('/_tools/converters/markdown-to-html')({
  component: MarkdownToHtmlPage,
})
