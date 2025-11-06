import { createFileRoute } from '@tanstack/react-router'
import SqlFormatterPage from '../../pages/tools/formatters/SqlFormatterPage'

export const Route = createFileRoute('/formatters/sql-formatter')({
  component: SqlFormatterPage,
})
