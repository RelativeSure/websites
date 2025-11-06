import { createFileRoute } from '@tanstack/react-router'
import IpSubnetPage from '../../../pages/tools/dev-tools/IpSubnetPage'

export const Route = createFileRoute('/_tools/dev-tools/ip-subnet')({
  component: IpSubnetPage,
})
