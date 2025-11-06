import { createFileRoute } from '@tanstack/react-router'
import StringEscapePage from '../../pages/tools/StringEscapePage'

export const Route = createFileRoute('/tools/string-escape')({
  component: StringEscapePage,
})
