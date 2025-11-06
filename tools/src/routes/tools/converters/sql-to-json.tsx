import { createFileRoute } from '@tanstack/react-router'
import SqlToJsonPage from '../../../pages/tools/converters/SqlToJsonPage'

export const Route = createFileRoute('/tools/converters/sql-to-json')({
  component: SqlToJsonPage,
})
