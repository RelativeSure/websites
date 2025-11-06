import { createFileRoute } from '@tanstack/react-router'
import NumberBasePage from '../../pages/tools/converters/NumberBasePage'

export const Route = createFileRoute('/converters/number-base')({
  component: NumberBasePage,
})
