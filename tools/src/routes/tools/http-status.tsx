import { createFileRoute } from '@tanstack/react-router'
import HttpStatusPage from '../../pages/tools/HttpStatusPage'

export const Route = createFileRoute('/tools/http-status')({
  component: HttpStatusPage,
})
