import { createFileRoute } from '@tanstack/react-router'
import DataUriPage from '../../../pages/tools/generators/DataUriPage'

export const Route = createFileRoute('/_tools/generators/data-uri')({
  component: DataUriPage,
})
