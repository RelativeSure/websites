import { createFileRoute } from '@tanstack/react-router'
import ImageCompressorPage from '../../pages/tools/ImageCompressorPage'

export const Route = createFileRoute('/tools/image-compressor')({
  component: ImageCompressorPage,
})
