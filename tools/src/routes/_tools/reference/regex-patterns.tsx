import { createFileRoute } from '@tanstack/react-router'
import RegexPatternsPage from '../../../pages/tools/reference/RegexPatternsPage'

export const Route = createFileRoute('/_tools/reference/regex-patterns')({
  component: RegexPatternsPage,
})
