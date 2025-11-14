import { createFileRoute } from "@tanstack/react-router";
import UnifiedConverterPage from "../../../pages/tools/converters/UnifiedConverterPage";

export const Route = createFileRoute("/_tools/converters/converter")({
  component: UnifiedConverterPage,
});
