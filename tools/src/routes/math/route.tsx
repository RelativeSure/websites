import { createFileRoute, Outlet } from '@tanstack/react-router'
import ToolsLayout from '../../layouts/ToolsLayout'

export const Route = createFileRoute('/math')({
  component: () => <ToolsLayout><Outlet /></ToolsLayout>,
})
