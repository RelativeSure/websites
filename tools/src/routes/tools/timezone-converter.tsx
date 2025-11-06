import { createFileRoute } from '@tanstack/react-router'
import TimezoneConverterPage from '../../pages/tools/TimezoneConverterPage'

export const Route = createFileRoute('/tools/timezone-converter')({
  component: TimezoneConverterPage,
})
