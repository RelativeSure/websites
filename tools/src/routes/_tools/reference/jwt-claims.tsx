import { createFileRoute } from '@tanstack/react-router'
import JwtClaimsPage from '../../../pages/tools/reference/JwtClaimsPage'

export const Route = createFileRoute('/_tools/reference/jwt-claims')({
  component: JwtClaimsPage,
})
