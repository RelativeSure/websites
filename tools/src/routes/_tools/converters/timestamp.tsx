import { createFileRoute } from '@tanstack/react-router'
import TimestampPage from '../../../pages/tools/converters/TimestampPage'

export const Route = createFileRoute('/_tools/converters/timestamp')({
  component: TimestampPage,
})
