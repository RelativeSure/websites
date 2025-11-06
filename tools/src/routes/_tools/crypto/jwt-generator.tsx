import { createFileRoute } from '@tanstack/react-router'
import JwtGeneratorPage from '../../../pages/tools/crypto/JwtGeneratorPage'

export const Route = createFileRoute('/_tools/crypto/jwt-generator')({
  component: JwtGeneratorPage,
})
