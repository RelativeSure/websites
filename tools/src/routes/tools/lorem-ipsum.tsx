import { createFileRoute } from '@tanstack/react-router'
import LoremIpsumPage from '../../pages/tools/LoremIpsumPage'

export const Route = createFileRoute('/tools/lorem-ipsum')({
  component: LoremIpsumPage,
})
