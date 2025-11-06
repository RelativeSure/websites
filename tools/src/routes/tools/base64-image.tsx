import { createFileRoute } from '@tanstack/react-router'
import Base64ImagePage from '../../pages/tools/Base64ImagePage'

export const Route = createFileRoute('/tools/base64-image')({
  component: Base64ImagePage,
})
