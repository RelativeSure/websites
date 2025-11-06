import { createFileRoute } from '@tanstack/react-router'
import SvgOptimizerPage from '../../../pages/tools/media/SvgOptimizerPage'

export const Route = createFileRoute('/_tools/media/svg-optimizer')({
  component: SvgOptimizerPage,
})
