import { createFileRoute } from "@tanstack/react-router";
import CssUnitPage from "../../../pages/tools/converters/CssUnitPage";

export const Route = createFileRoute("/_tools/converters/css-unit")({
  component: CssUnitPage,
});
