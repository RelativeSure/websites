import { createFileRoute } from '@tanstack/react-router'
import HtmlEntityPage from '../../pages/tools/HtmlEntityPage'

export const Route = createFileRoute('/tools/html-entity')({
  component: HtmlEntityPage,
})
