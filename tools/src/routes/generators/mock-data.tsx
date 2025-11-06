import { createFileRoute } from '@tanstack/react-router'
import MockDataPage from '../../pages/tools/generators/MockDataPage'

export const Route = createFileRoute('/generators/mock-data')({
  component: MockDataPage,
})
