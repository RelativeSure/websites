import { createFileRoute, Outlet } from '@tanstack/react-router'
import ToolsLayout from '../../layouts/ToolsLayout'

export const Route = createFileRoute('/encoders')({
  component: () => <ToolsLayout><Outlet /></ToolsLayout>,
})
