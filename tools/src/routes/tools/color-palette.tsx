import { createFileRoute } from '@tanstack/react-router'
import ColorPalettePage from '../../pages/tools/ColorPalettePage'

export const Route = createFileRoute('/tools/color-palette')({
  component: ColorPalettePage,
})
