import { createFileRoute } from '@tanstack/react-router'
import AsciiArtPage from '../../../pages/tools/text-tools/AsciiArtPage'

export const Route = createFileRoute('/tools/text-tools/ascii-art')({
  component: AsciiArtPage,
})
