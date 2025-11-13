import { createFileRoute } from "@tanstack/react-router";
import JsonYamlPage from "../../../pages/tools/converters/JsonYamlPage";

export const Route = createFileRoute("/_tools/converters/json-yaml")({
  component: JsonYamlPage,
});
