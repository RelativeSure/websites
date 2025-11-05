import { createFileRoute } from '@tanstack/react-router'
import SqlFormatterPage from '../../pages/tools/SqlFormatterPage'

export const Route = createFileRoute('/tools/sql-formatter')({
  component: SqlFormatterPage,
})
