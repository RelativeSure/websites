import { createFileRoute } from '@tanstack/react-router'
import HtaccessGeneratorPage from '../../../pages/tools/generators/HtaccessGeneratorPage'

export const Route = createFileRoute('/_tools/generators/htaccess-generator')({
  component: HtaccessGeneratorPage,
})
