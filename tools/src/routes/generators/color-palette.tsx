import { createFileRoute } from '@tanstack/react-router'
import ColorPalettePage from '../../pages/tools/generators/ColorPalettePage'

export const Route = createFileRoute('/generators/color-palette')({
  component: ColorPalettePage,
})
