import { createFileRoute } from '@tanstack/react-router'
import HtmlEntitiesPage from '../../../pages/tools/reference/HtmlEntitiesPage'

export const Route = createFileRoute('/_tools/reference/html-entities')({
  component: HtmlEntitiesPage,
})
