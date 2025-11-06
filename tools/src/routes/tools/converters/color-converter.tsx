import { createFileRoute } from '@tanstack/react-router'
import ColorConverterPage from '../../../pages/tools/converters/ColorConverterPage'

export const Route = createFileRoute('/tools/converters/color-converter')({
  component: ColorConverterPage,
})
