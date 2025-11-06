import { createFileRoute } from '@tanstack/react-router'
import JwtVerifierPage from '../../pages/tools/crypto/JwtVerifierPage'

export const Route = createFileRoute('/crypto/jwt-verifier')({
  component: JwtVerifierPage,
})
