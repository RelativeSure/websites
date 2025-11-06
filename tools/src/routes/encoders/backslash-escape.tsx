import { createFileRoute } from '@tanstack/react-router'
import BackslashEscapePage from '../../pages/tools/encoders/BackslashEscapePage'

export const Route = createFileRoute('/encoders/backslash-escape')({
  component: BackslashEscapePage,
})
