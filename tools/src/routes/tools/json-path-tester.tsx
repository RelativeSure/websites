import { createFileRoute } from '@tanstack/react-router'
import JsonPathTesterPage from '../../pages/tools/JsonPathTesterPage'

export const Route = createFileRoute('/tools/json-path-tester')({
  component: JsonPathTesterPage,
})
