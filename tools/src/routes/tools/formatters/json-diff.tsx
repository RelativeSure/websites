import { createFileRoute } from '@tanstack/react-router'
import JsonDiffPage from '../../../pages/tools/formatters/JsonDiffPage'

export const Route = createFileRoute('/tools/formatters/json-diff')({
  component: JsonDiffPage,
})
