import { createFileRoute } from "@tanstack/react-router";
import JsMinifierPage from "../../../pages/tools/dev-tools/JsMinifierPage";

export const Route = createFileRoute("/_tools/dev-tools/js-minifier")({
  component: JsMinifierPage,
});
