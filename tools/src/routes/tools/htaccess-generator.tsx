import { createFileRoute } from '@tanstack/react-router'
import HtaccessGeneratorPage from '../../pages/tools/HtaccessGeneratorPage'

export const Route = createFileRoute('/tools/htaccess-generator')({
  component: HtaccessGeneratorPage,
})
