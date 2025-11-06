import { createFileRoute } from '@tanstack/react-router'
import UuidPage from '../../pages/tools/generators/UuidPage'

export const Route = createFileRoute('/generators/uuid')({
  component: UuidPage,
})
