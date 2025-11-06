import { createFileRoute } from '@tanstack/react-router'
import JsonDiffPage from '../../pages/tools/JsonDiffPage'

export const Route = createFileRoute('/tools/json-diff')({
  component: JsonDiffPage,
})
