import { createFileRoute } from '@tanstack/react-router'
import MarkdownSyntaxPage from '../../../pages/tools/reference/MarkdownSyntaxPage'

export const Route = createFileRoute('/_tools/reference/markdown-syntax')({
  component: MarkdownSyntaxPage,
})
