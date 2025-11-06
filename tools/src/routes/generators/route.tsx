import { createFileRoute, Outlet } from '@tanstack/react-router'
import ToolsLayout from '../../layouts/ToolsLayout'

export const Route = createFileRoute('/generators')({
  component: () => <ToolsLayout><Outlet /></ToolsLayout>,
})
