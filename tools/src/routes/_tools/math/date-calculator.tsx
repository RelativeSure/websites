import { createFileRoute } from '@tanstack/react-router'
import DateCalculatorPage from '../../../pages/tools/math/DateCalculatorPage'

export const Route = createFileRoute('/_tools/math/date-calculator')({
  component: DateCalculatorPage,
})
