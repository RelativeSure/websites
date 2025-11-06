import { createFileRoute } from '@tanstack/react-router'
import JsonDiffPage from '../../pages/tools/formatters/JsonDiffPage'

export const Route = createFileRoute('/formatters/json-diff')({
  component: JsonDiffPage,
})
