import { createFileRoute } from '@tanstack/react-router'
import JsonValidatorPage from '../../pages/tools/JsonValidatorPage'

export const Route = createFileRoute('/tools/json-validator')({
  component: JsonValidatorPage,
})
