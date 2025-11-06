import { createFileRoute } from '@tanstack/react-router'
import StringCounterPage from '../../pages/tools/text-tools/StringCounterPage'

export const Route = createFileRoute('/text-tools/string-counter')({
  component: StringCounterPage,
})
