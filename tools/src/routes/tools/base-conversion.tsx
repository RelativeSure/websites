import { createFileRoute } from '@tanstack/react-router'
import BaseConversionPage from '../../pages/tools/BaseConversionPage'

export const Route = createFileRoute('/tools/base-conversion')({
  component: BaseConversionPage,
})
