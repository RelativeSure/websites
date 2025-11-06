import { createFileRoute } from '@tanstack/react-router'
import UnitConverterPage from '../../pages/tools/converters/UnitConverterPage'

export const Route = createFileRoute('/converters/unit-converter')({
  component: UnitConverterPage,
})
