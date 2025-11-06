import { createFileRoute } from '@tanstack/react-router'
import UrlEncodePage from '../../../pages/tools/encoders/UrlEncodePage'

export const Route = createFileRoute('/tools/encoders/url-encode')({
  component: UrlEncodePage,
})
