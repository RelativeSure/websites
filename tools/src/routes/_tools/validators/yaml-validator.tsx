import { createFileRoute } from '@tanstack/react-router'
import YamlValidatorPage from '../../../pages/tools/validators/YamlValidatorPage'

export const Route = createFileRoute('/_tools/validators/yaml-validator')({
  component: YamlValidatorPage,
})
