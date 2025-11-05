import { createFileRoute } from '@tanstack/react-router'
import NumberBasePage from '../../pages/tools/NumberBasePage'

export const Route = createFileRoute('/tools/number-base')({
  component: NumberBasePage,
})
