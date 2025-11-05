import { createFileRoute } from '@tanstack/react-router'
import JsonToTypescriptPage from '../../pages/tools/JsonToTypescriptPage'

export const Route = createFileRoute('/tools/json-to-typescript')({
  component: JsonToTypescriptPage,
})
