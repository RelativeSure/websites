import { createFileRoute } from '@tanstack/react-router'
import ImageResizerPage from '../../pages/tools/ImageResizerPage'

export const Route = createFileRoute('/tools/image-resizer')({
  component: ImageResizerPage,
})
