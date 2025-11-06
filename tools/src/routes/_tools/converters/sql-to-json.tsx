import { createFileRoute } from '@tanstack/react-router'
import SqlToJsonPage from '../../../pages/tools/converters/SqlToJsonPage'

export const Route = createFileRoute('/_tools/converters/sql-to-json')({
  component: SqlToJsonPage,
})
