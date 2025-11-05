import { createFileRoute } from '@tanstack/react-router'
import UrlEncodePage from '../../pages/tools/UrlEncodePage'

export const Route = createFileRoute('/tools/url-encode')({
  component: UrlEncodePage,
})
