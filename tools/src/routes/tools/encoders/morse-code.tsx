import { createFileRoute } from '@tanstack/react-router'
import MorseCodePage from '../../../pages/tools/encoders/MorseCodePage'

export const Route = createFileRoute('/tools/encoders/morse-code')({
  component: MorseCodePage,
})
