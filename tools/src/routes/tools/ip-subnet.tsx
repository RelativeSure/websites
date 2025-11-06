import { createFileRoute } from '@tanstack/react-router'
import IpSubnetPage from '../../pages/tools/IpSubnetPage'

export const Route = createFileRoute('/tools/ip-subnet')({
  component: IpSubnetPage,
})
