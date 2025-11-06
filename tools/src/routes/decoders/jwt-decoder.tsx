import { createFileRoute } from '@tanstack/react-router'
import JwtDecoderPage from '../../pages/tools/decoders/JwtDecoderPage'

export const Route = createFileRoute('/decoders/jwt-decoder')({
  component: JwtDecoderPage,
})
