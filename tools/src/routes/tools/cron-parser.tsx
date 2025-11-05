import { createFileRoute } from '@tanstack/react-router'
import CronParserPage from '../../pages/tools/CronParserPage'

export const Route = createFileRoute('/tools/cron-parser')({
  component: CronParserPage,
})
