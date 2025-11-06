import { createFileRoute } from '@tanstack/react-router'
import HtmlFormatterPage from '../../../pages/tools/formatters/HtmlFormatterPage'

export const Route = createFileRoute('/tools/formatters/html-formatter')({
  component: HtmlFormatterPage,
})
