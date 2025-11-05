import { createFileRoute } from '@tanstack/react-router'
import ColorConverterPage from '../../pages/tools/ColorConverterPage'

export const Route = createFileRoute('/tools/color-converter')({
  component: ColorConverterPage,
})
