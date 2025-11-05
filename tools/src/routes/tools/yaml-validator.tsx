import { createFileRoute } from '@tanstack/react-router'
import YamlValidatorPage from '../../pages/tools/YamlValidatorPage'

export const Route = createFileRoute('/tools/yaml-validator')({
  component: YamlValidatorPage,
})
