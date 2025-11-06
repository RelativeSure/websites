import { createFileRoute } from '@tanstack/react-router'
import LoremIpsumPage from '../../pages/tools/generators/LoremIpsumPage'

export const Route = createFileRoute('/generators/lorem-ipsum')({
  component: LoremIpsumPage,
})
