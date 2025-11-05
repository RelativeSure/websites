import { createFileRoute } from '@tanstack/react-router'
import UrlParserPage from '../../pages/tools/UrlParserPage'

export const Route = createFileRoute('/tools/url-parser')({
  component: UrlParserPage,
})
