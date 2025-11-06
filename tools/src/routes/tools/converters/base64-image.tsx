import { createFileRoute } from '@tanstack/react-router'
import Base64ImagePage from '../../../pages/tools/converters/Base64ImagePage'

export const Route = createFileRoute('/tools/converters/base64-image')({
  component: Base64ImagePage,
})
