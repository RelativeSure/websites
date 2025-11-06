import { createFileRoute } from '@tanstack/react-router'
import PackageJsonAnalyzerPage from '../../pages/tools/PackageJsonAnalyzerPage'

export const Route = createFileRoute('/tools/package-json-analyzer')({
  component: PackageJsonAnalyzerPage,
})
