import { createFileRoute } from '@tanstack/react-router'
import RegexTesterPage from '../../pages/tools/RegexTesterPage'

export const Route = createFileRoute('/tools/regex-tester')({
  component: RegexTesterPage,
})
