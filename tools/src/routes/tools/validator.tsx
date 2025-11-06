import { createFileRoute } from '@tanstack/react-router'
import ValidatorPage from '../../pages/tools/ValidatorPage'

export const Route = createFileRoute('/tools/validator')({
  component: ValidatorPage,
})
