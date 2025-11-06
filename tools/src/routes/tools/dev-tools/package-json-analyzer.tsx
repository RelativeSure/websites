import { createFileRoute } from '@tanstack/react-router'
import PackageJsonAnalyzerPage from '../../../pages/tools/dev-tools/PackageJsonAnalyzerPage'

export const Route = createFileRoute('/tools/dev-tools/package-json-analyzer')({
  component: PackageJsonAnalyzerPage,
})
