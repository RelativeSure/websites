import { createFileRoute } from '@tanstack/react-router'
import TimezoneConverterPage from '../../../pages/tools/converters/TimezoneConverterPage'

export const Route = createFileRoute('/_tools/converters/timezone-converter')({
  component: TimezoneConverterPage,
})
