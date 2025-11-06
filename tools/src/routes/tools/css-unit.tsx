import { createFileRoute } from '@tanstack/react-router'
import CssUnitPage from '../../pages/tools/CssUnitPage'

export const Route = createFileRoute('/tools/css-unit')({
  component: CssUnitPage,
})
