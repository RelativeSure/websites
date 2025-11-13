import { createFileRoute } from "@tanstack/react-router";
import ColorNamesPage from "../../../pages/tools/reference/ColorNamesPage";

export const Route = createFileRoute("/_tools/reference/color-names")({
  component: ColorNamesPage,
});
