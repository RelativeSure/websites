import { createFileRoute } from '@tanstack/react-router'
import BinaryCalculatorPage from '../../pages/tools/BinaryCalculatorPage'

export const Route = createFileRoute('/tools/binary-calculator')({
  component: BinaryCalculatorPage,
})
