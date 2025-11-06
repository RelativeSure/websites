import { createFileRoute } from '@tanstack/react-router'
import DateCalculatorPage from '../../pages/tools/DateCalculatorPage'

export const Route = createFileRoute('/tools/date-calculator')({
  component: DateCalculatorPage,
})
