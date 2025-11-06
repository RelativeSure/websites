import { createFileRoute } from '@tanstack/react-router'
import PercentageCalculatorPage from '../../../pages/tools/math/PercentageCalculatorPage'

export const Route = createFileRoute('/_tools/math/percentage-calculator')({
  component: PercentageCalculatorPage,
})
