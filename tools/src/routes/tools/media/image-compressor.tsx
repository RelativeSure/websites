import { createFileRoute } from '@tanstack/react-router'
import ImageCompressorPage from '../../../pages/tools/media/ImageCompressorPage'

export const Route = createFileRoute('/tools/media/image-compressor')({
  component: ImageCompressorPage,
})
