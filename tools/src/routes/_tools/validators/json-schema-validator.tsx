import { createFileRoute } from '@tanstack/react-router'
import JsonSchemaValidatorPage from '../../../pages/tools/validators/JsonSchemaValidatorPage'

export const Route = createFileRoute('/_tools/validators/json-schema-validator')({
  component: JsonSchemaValidatorPage,
})
