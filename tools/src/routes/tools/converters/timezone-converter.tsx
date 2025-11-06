import { createFileRoute } from '@tanstack/react-router'
import TimezoneConverterPage from '../../../pages/tools/converters/TimezoneConverterPage'

export const Route = createFileRoute('/tools/converters/timezone-converter')({
  component: TimezoneConverterPage,
})
