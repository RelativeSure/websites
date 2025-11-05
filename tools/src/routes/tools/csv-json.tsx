import { createFileRoute } from '@tanstack/react-router'
import CsvJsonPage from '../../pages/tools/CsvJsonPage'

export const Route = createFileRoute('/tools/csv-json')({
  component: CsvJsonPage,
})
