import { createFileRoute } from '@tanstack/react-router'
import IpAddressRangesPage from '../../../pages/tools/reference/IpAddressRangesPage'

export const Route = createFileRoute('/_tools/reference/ip-address-ranges')({
  component: IpAddressRangesPage,
})
