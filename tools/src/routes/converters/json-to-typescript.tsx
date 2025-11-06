import { createFileRoute } from '@tanstack/react-router'
import JsonToTypescriptPage from '../../pages/tools/converters/JsonToTypescriptPage'

export const Route = createFileRoute('/converters/json-to-typescript')({
  component: JsonToTypescriptPage,
})
