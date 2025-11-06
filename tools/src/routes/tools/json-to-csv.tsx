import { createFileRoute } from '@tanstack/react-router'
import JsonToCsvPage from '../../pages/tools/JsonToCsvPage'

export const Route = createFileRoute('/tools/json-to-csv')({
  component: JsonToCsvPage,
})
