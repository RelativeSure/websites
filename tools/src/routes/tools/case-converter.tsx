import { createFileRoute } from '@tanstack/react-router'
import CaseConverterPage from '../../pages/tools/CaseConverterPage'

export const Route = createFileRoute('/tools/case-converter')({
  component: CaseConverterPage,
})
