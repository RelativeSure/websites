import { createFileRoute } from '@tanstack/react-router'
import BackslashEscapePage from '../../pages/tools/BackslashEscapePage'

export const Route = createFileRoute('/tools/backslash-escape')({
  component: BackslashEscapePage,
})
