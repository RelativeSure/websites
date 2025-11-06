import { createFileRoute } from '@tanstack/react-router'
import JsMinifierPage from '../../pages/tools/JsMinifierPage'

export const Route = createFileRoute('/tools/js-minifier')({
  component: JsMinifierPage,
})
