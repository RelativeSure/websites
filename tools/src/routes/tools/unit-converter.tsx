import { createFileRoute } from '@tanstack/react-router'
import UnitConverterPage from '../../pages/tools/UnitConverterPage'

export const Route = createFileRoute('/tools/unit-converter')({
  component: UnitConverterPage,
})
