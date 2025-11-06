import { createFileRoute } from '@tanstack/react-router'
import JsonValidatorPage from '../../../pages/tools/validators/JsonValidatorPage'

export const Route = createFileRoute('/_tools/validators/json-validator')({
  component: JsonValidatorPage,
})
