import { createFileRoute } from '@tanstack/react-router'
import JsonSchemaValidatorPage from '../../pages/tools/JsonSchemaValidatorPage'

export const Route = createFileRoute('/tools/json-schema-validator')({
  component: JsonSchemaValidatorPage,
})
