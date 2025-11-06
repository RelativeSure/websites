import { createFileRoute } from '@tanstack/react-router'
import MockDataPage from '../../pages/tools/MockDataPage'

export const Route = createFileRoute('/tools/mock-data')({
  component: MockDataPage,
})
