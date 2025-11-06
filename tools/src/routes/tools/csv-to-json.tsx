import { createFileRoute } from '@tanstack/react-router'
import CsvToJsonPage from '../../pages/tools/CsvToJsonPage'

export const Route = createFileRoute('/tools/csv-to-json')({
  component: CsvToJsonPage,
})
