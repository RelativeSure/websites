import { createFileRoute } from '@tanstack/react-router'
import JwtGeneratorPage from '../../pages/tools/JwtGeneratorPage'

export const Route = createFileRoute('/tools/jwt-generator')({
  component: JwtGeneratorPage,
})
