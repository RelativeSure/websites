import { createFileRoute } from '@tanstack/react-router'
import JsonToCsvPage from '../../../pages/tools/converters/JsonToCsvPage'

export const Route = createFileRoute('/tools/converters/json-to-csv')({
  component: JsonToCsvPage,
})
