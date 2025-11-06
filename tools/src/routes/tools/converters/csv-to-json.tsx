import { createFileRoute } from '@tanstack/react-router'
import CsvToJsonPage from '../../../pages/tools/converters/CsvToJsonPage'

export const Route = createFileRoute('/tools/converters/csv-to-json')({
  component: CsvToJsonPage,
})
