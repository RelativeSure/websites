import { createFileRoute } from "@tanstack/react-router";
import JsonFormatterPage from "../../../pages/tools/formatters/JsonFormatterPage";

export const Route = createFileRoute("/_tools/formatters/json-formatter")({
  component: JsonFormatterPage,
});
