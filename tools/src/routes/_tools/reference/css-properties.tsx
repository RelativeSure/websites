import { createFileRoute } from '@tanstack/react-router'
import CssPropertiesPage from '../../../pages/tools/reference/CssPropertiesPage'

export const Route = createFileRoute('/_tools/reference/css-properties')({
  component: CssPropertiesPage,
})
