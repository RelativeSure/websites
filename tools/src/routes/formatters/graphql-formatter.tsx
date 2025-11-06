import { createFileRoute } from '@tanstack/react-router'
import GraphqlFormatterPage from '../../pages/tools/formatters/GraphqlFormatterPage'

export const Route = createFileRoute('/formatters/graphql-formatter')({
  component: GraphqlFormatterPage,
})
