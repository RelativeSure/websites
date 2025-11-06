import { createFileRoute } from '@tanstack/react-router'
import CaseConverterPage from '../../pages/tools/text-tools/CaseConverterPage'

export const Route = createFileRoute('/text-tools/case-converter')({
  component: CaseConverterPage,
})
