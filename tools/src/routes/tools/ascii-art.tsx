import { createFileRoute } from '@tanstack/react-router'
import AsciiArtPage from '../../pages/tools/AsciiArtPage'

export const Route = createFileRoute('/tools/ascii-art')({
  component: AsciiArtPage,
})
