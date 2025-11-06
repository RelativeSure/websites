import { createFileRoute } from '@tanstack/react-router'
import JsonYamlPage from '../../../pages/tools/converters/JsonYamlPage'

export const Route = createFileRoute('/tools/converters/json-yaml')({
  component: JsonYamlPage,
})
