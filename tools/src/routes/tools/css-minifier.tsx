import { createFileRoute } from '@tanstack/react-router'
import CssMinifierPage from '../../pages/tools/CssMinifierPage'

export const Route = createFileRoute('/tools/css-minifier')({
  component: CssMinifierPage,
})
