import { createFileRoute } from '@tanstack/react-router'
import JsonSchemaValidatorPage from '../../pages/tools/validators/JsonSchemaValidatorPage'

export const Route = createFileRoute('/validators/json-schema-validator')({
  component: JsonSchemaValidatorPage,
})
