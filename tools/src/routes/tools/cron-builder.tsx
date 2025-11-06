import { createFileRoute } from '@tanstack/react-router'
import CronBuilderPage from '../../pages/tools/CronBuilderPage'

export const Route = createFileRoute('/tools/cron-builder')({
  component: CronBuilderPage,
})
