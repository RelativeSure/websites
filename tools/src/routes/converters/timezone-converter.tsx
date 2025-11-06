import { createFileRoute } from '@tanstack/react-router'
import TimezoneConverterPage from '../../pages/tools/converters/TimezoneConverterPage'

export const Route = createFileRoute('/converters/timezone-converter')({
  component: TimezoneConverterPage,
})
