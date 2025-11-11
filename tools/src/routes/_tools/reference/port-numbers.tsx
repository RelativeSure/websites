import { createFileRoute } from '@tanstack/react-router'
import PortNumbersPage from '../../../pages/tools/reference/PortNumbersPage'

export const Route = createFileRoute('/_tools/reference/port-numbers')({
  component: PortNumbersPage,
})
