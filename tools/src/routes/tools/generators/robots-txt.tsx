import { createFileRoute } from '@tanstack/react-router'
import RobotsTxtPage from '../../../pages/tools/generators/RobotsTxtPage'

export const Route = createFileRoute('/tools/generators/robots-txt')({
  component: RobotsTxtPage,
})
