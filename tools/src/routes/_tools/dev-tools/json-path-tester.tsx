import { createFileRoute } from '@tanstack/react-router'
import JsonPathTesterPage from '../../../pages/tools/dev-tools/JsonPathTesterPage'

export const Route = createFileRoute('/_tools/dev-tools/json-path-tester')({
  component: JsonPathTesterPage,
})
