import { createFileRoute } from '@tanstack/react-router'
import XmlToYamlPage from '../../pages/tools/XmlToYamlPage'

export const Route = createFileRoute('/tools/xml-to-yaml')({
  component: XmlToYamlPage,
})
