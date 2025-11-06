import { createFileRoute } from '@tanstack/react-router'
import ImageToBase64Page from '../../pages/tools/encoders/ImageToBase64Page'

export const Route = createFileRoute('/encoders/image-to-base64')({
  component: ImageToBase64Page,
})
