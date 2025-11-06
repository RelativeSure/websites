import { createFileRoute } from '@tanstack/react-router'
import PercentageCalculatorPage from '../../pages/tools/PercentageCalculatorPage'

export const Route = createFileRoute('/tools/percentage-calculator')({
  component: PercentageCalculatorPage,
})
