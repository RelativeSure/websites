import { createFileRoute } from '@tanstack/react-router'
import HttpStatusPage from '../../pages/tools/reference/HttpStatusPage'

export const Route = createFileRoute('/reference/http-status')({
  component: HttpStatusPage,
})
