import { createFileRoute } from '@tanstack/react-router'
import CssMinifierPage from '../../../pages/tools/formatters/CssMinifierPage'

export const Route = createFileRoute('/tools/formatters/css-minifier')({
  component: CssMinifierPage,
})
