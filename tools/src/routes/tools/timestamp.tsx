import { createFileRoute } from '@tanstack/react-router'
import TimestampPage from '../../pages/tools/TimestampPage'

export const Route = createFileRoute('/tools/timestamp')({
  component: TimestampPage,
})
