import { createFileRoute } from '@tanstack/react-router'
import GraphqlFormatterPage from '../../pages/tools/GraphqlFormatterPage'

export const Route = createFileRoute('/tools/graphql-formatter')({
  component: GraphqlFormatterPage,
})
