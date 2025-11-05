import { createFileRoute } from '@tanstack/react-router'
import JsonFormatterPage from '../../pages/tools/JsonFormatterPage'

export const Route = createFileRoute('/tools/json-formatter')({
  component: JsonFormatterPage,
})
