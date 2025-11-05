import { createFileRoute } from '@tanstack/react-router'
import Base64Page from '../../pages/tools/Base64Page'

export const Route = createFileRoute('/tools/base64')({
  component: Base64Page,
})
