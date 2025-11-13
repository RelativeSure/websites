import { createFileRoute } from "@tanstack/react-router";
import XmlToYamlPage from "../../../pages/tools/converters/XmlToYamlPage";

export const Route = createFileRoute("/_tools/converters/xml-to-yaml")({
  component: XmlToYamlPage,
});
