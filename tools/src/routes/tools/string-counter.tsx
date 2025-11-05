import { createFileRoute } from '@tanstack/react-router'
import StringCounterPage from '../../pages/tools/StringCounterPage'

export const Route = createFileRoute('/tools/string-counter')({
  component: StringCounterPage,
})
