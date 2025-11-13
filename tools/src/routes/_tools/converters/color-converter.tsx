import { createFileRoute } from "@tanstack/react-router";
import ColorConverterPage from "../../../pages/tools/converters/ColorConverterPage";

export const Route = createFileRoute("/_tools/converters/color-converter")({
  component: ColorConverterPage,
});
