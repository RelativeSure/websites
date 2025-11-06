import { createFileRoute } from '@tanstack/react-router'
import DataUriPage from '../../../pages/tools/generators/DataUriPage'

export const Route = createFileRoute('/tools/generators/data-uri')({
  component: DataUriPage,
})
