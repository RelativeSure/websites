import { createFileRoute } from '@tanstack/react-router'
import ExpressionEvaluatorPage from '../../pages/tools/ExpressionEvaluatorPage'

export const Route = createFileRoute('/tools/expression-evaluator')({
  component: ExpressionEvaluatorPage,
})
