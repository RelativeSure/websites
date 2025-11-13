import { createFileRoute } from "@tanstack/react-router";
import GraphqlFormatterPage from "../../../pages/tools/formatters/GraphqlFormatterPage";

export const Route = createFileRoute("/_tools/formatters/graphql-formatter")({
  component: GraphqlFormatterPage,
});
