import { createFileRoute } from '@tanstack/react-router'
import SqlToJsonPage from '../../pages/tools/SqlToJsonPage'

export const Route = createFileRoute('/tools/sql-to-json')({
  component: SqlToJsonPage,
})
