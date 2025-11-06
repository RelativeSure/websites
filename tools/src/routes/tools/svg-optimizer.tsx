import { createFileRoute } from '@tanstack/react-router'
import SvgOptimizerPage from '../../pages/tools/SvgOptimizerPage'

export const Route = createFileRoute('/tools/svg-optimizer')({
  component: SvgOptimizerPage,
})
