import { createFileRoute } from '@tanstack/react-router'
import XmlJsonPage from '../../pages/tools/XmlJsonPage'

export const Route = createFileRoute('/tools/xml-json')({
  component: XmlJsonPage,
})
