import { createFileRoute } from '@tanstack/react-router'
import CronBuilderPage from '../../../pages/tools/dev-tools/CronBuilderPage'

export const Route = createFileRoute('/tools/dev-tools/cron-builder')({
  component: CronBuilderPage,
})
