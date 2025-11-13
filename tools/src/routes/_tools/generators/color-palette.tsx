import { createFileRoute } from "@tanstack/react-router";
import ColorPalettePage from "../../../pages/tools/generators/ColorPalettePage";

export const Route = createFileRoute("/_tools/generators/color-palette")({
  component: ColorPalettePage,
});
