import { createFileRoute } from '@tanstack/react-router'
import JsonYamlPage from '../../pages/tools/JsonYamlPage'

export const Route = createFileRoute('/tools/json-yaml')({
  component: JsonYamlPage,
})
