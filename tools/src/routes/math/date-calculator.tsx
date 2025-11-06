import { createFileRoute } from '@tanstack/react-router'
import DateCalculatorPage from '../../pages/tools/math/DateCalculatorPage'

export const Route = createFileRoute('/math/date-calculator')({
  component: DateCalculatorPage,
})
