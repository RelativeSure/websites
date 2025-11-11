import { createFileRoute } from '@tanstack/react-router'
import MimeTypesPage from '../../../pages/tools/reference/MimeTypesPage'

export const Route = createFileRoute('/_tools/reference/mime-types')({
  component: MimeTypesPage,
})
