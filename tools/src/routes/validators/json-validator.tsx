import { createFileRoute } from '@tanstack/react-router'
import JsonValidatorPage from '../../pages/tools/validators/JsonValidatorPage'

export const Route = createFileRoute('/validators/json-validator')({
  component: JsonValidatorPage,
})
