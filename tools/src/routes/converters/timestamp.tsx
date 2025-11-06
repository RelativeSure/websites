import { createFileRoute } from '@tanstack/react-router'
import TimestampPage from '../../pages/tools/converters/TimestampPage'

export const Route = createFileRoute('/converters/timestamp')({
  component: TimestampPage,
})
