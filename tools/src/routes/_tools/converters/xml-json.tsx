import { createFileRoute } from "@tanstack/react-router";
import XmlJsonPage from "../../../pages/tools/converters/XmlJsonPage";

export const Route = createFileRoute("/_tools/converters/xml-json")({
  component: XmlJsonPage,
});
