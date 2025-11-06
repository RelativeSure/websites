import { createFileRoute } from '@tanstack/react-router'
import ExpressionEvaluatorPage from '../../../pages/tools/math/ExpressionEvaluatorPage'

export const Route = createFileRoute('/tools/math/expression-evaluator')({
  component: ExpressionEvaluatorPage,
})
