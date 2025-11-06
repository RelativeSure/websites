import { createFileRoute } from '@tanstack/react-router'
import DataUriPage from '../../pages/tools/DataUriPage'

export const Route = createFileRoute('/tools/data-uri')({
  component: DataUriPage,
})
