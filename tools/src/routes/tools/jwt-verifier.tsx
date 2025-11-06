import { createFileRoute } from '@tanstack/react-router'
import JwtVerifierPage from '../../pages/tools/JwtVerifierPage'

export const Route = createFileRoute('/tools/jwt-verifier')({
  component: JwtVerifierPage,
})
