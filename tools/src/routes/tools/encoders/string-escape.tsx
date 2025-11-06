import { createFileRoute } from '@tanstack/react-router'
import StringEscapePage from '../../../pages/tools/encoders/StringEscapePage'

export const Route = createFileRoute('/tools/encoders/string-escape')({
  component: StringEscapePage,
})
