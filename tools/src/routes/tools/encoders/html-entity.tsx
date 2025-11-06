import { createFileRoute } from '@tanstack/react-router'
import HtmlEntityPage from '../../../pages/tools/encoders/HtmlEntityPage'

export const Route = createFileRoute('/tools/encoders/html-entity')({
  component: HtmlEntityPage,
})
