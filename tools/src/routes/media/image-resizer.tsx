import { createFileRoute } from '@tanstack/react-router'
import ImageResizerPage from '../../pages/tools/media/ImageResizerPage'

export const Route = createFileRoute('/media/image-resizer')({
  component: ImageResizerPage,
})
