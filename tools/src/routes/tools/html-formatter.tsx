import { createFileRoute } from '@tanstack/react-router'
import HtmlFormatterPage from '../../pages/tools/HtmlFormatterPage'

export const Route = createFileRoute('/tools/html-formatter')({
  component: HtmlFormatterPage,
})
