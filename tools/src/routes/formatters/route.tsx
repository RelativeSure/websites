import { createFileRoute, Outlet } from '@tanstack/react-router'
import ToolsLayout from '../../layouts/ToolsLayout'

export const Route = createFileRoute('/formatters')({
  component: () => <ToolsLayout><Outlet /></ToolsLayout>,
})
