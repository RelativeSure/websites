import { createFileRoute } from '@tanstack/react-router'
import YamlValidatorPage from '../../pages/tools/validators/YamlValidatorPage'

export const Route = createFileRoute('/validators/yaml-validator')({
  component: YamlValidatorPage,
})
