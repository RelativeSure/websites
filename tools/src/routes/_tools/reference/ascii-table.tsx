import { createFileRoute } from '@tanstack/react-router'
import AsciiTablePage from '../../../pages/tools/reference/AsciiTablePage'

export const Route = createFileRoute('/_tools/reference/ascii-table')({
  component: AsciiTablePage,
})
