import { createFileRoute } from '@tanstack/react-router'
import CronBuilderPage from '../../../pages/tools/dev-tools/CronBuilderPage'

export const Route = createFileRoute('/_tools/dev-tools/cron-builder')({
  component: CronBuilderPage,
})
