import { createFileRoute } from '@tanstack/react-router'
import ImageToBase64Page from '../../pages/tools/ImageToBase64Page'

export const Route = createFileRoute('/tools/image-to-base64')({
  component: ImageToBase64Page,
})
