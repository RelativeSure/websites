import { createFileRoute } from '@tanstack/react-router'
import JwtDecoderPage from '../../pages/tools/JwtDecoderPage'

export const Route = createFileRoute('/tools/jwt-decoder')({
  component: JwtDecoderPage,
})
