import { createFileRoute } from '@tanstack/react-router'
import RandomDataPage from '../../pages/tools/RandomDataPage'

export const Route = createFileRoute('/tools/random-data')({
  component: RandomDataPage,
})
