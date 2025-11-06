import { createFileRoute } from '@tanstack/react-router'
import RobotsTxtPage from '../../pages/tools/RobotsTxtPage'

export const Route = createFileRoute('/tools/robots-txt')({
  component: RobotsTxtPage,
})
