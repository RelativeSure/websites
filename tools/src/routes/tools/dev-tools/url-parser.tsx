import { createFileRoute } from '@tanstack/react-router'
import UrlParserPage from '../../../pages/tools/dev-tools/UrlParserPage'

export const Route = createFileRoute('/tools/dev-tools/url-parser')({
  component: UrlParserPage,
})
