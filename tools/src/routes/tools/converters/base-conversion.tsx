import { createFileRoute } from '@tanstack/react-router'
import BaseConversionPage from '../../../pages/tools/converters/BaseConversionPage'

export const Route = createFileRoute('/tools/converters/base-conversion')({
  component: BaseConversionPage,
})
