import { createFileRoute } from '@tanstack/react-router'
import MorseCodePage from '../../../pages/tools/encoders/MorseCodePage'

export const Route = createFileRoute('/_tools/encoders/morse-code')({
  component: MorseCodePage,
})
