import { createFileRoute } from '@tanstack/react-router'
import CronParserPage from '../../../pages/tools/dev-tools/CronParserPage'

export const Route = createFileRoute('/tools/dev-tools/cron-parser')({
  component: CronParserPage,
})
