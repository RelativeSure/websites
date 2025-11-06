import { createFileRoute } from '@tanstack/react-router'
import TextStatisticsPage from '../../pages/tools/TextStatisticsPage'

export const Route = createFileRoute('/tools/text-statistics')({
  component: TextStatisticsPage,
})
