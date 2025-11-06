import { createFileRoute } from '@tanstack/react-router'
import MorseCodePage from '../../pages/tools/MorseCodePage'

export const Route = createFileRoute('/tools/morse-code')({
  component: MorseCodePage,
})
