import { createFileRoute } from '@tanstack/react-router'
import UuidPage from '../../pages/tools/UuidPage'

export const Route = createFileRoute('/tools/uuid')({
  component: UuidPage,
})
