import { createFileRoute } from '@tanstack/react-router'
import UserAgentParserPage from '../../pages/tools/UserAgentParserPage'

export const Route = createFileRoute('/tools/user-agent-parser')({
  component: UserAgentParserPage,
})
