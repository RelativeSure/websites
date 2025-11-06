import { createFileRoute } from '@tanstack/react-router'
import HtaccessGeneratorPage from '../../../pages/tools/generators/HtaccessGeneratorPage'

export const Route = createFileRoute('/tools/generators/htaccess-generator')({
  component: HtaccessGeneratorPage,
})
