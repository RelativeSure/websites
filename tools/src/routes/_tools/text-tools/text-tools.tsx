import { createFileRoute } from "@tanstack/react-router";
import TextToolsPage from "../../../pages/tools/text-tools/TextToolsPage";

export const Route = createFileRoute("/_tools/text-tools/text-tools")({
  component: TextToolsPage,
});
