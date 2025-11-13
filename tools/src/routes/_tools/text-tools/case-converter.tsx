import { createFileRoute } from "@tanstack/react-router";
import CaseConverterPage from "../../../pages/tools/text-tools/CaseConverterPage";

export const Route = createFileRoute("/_tools/text-tools/case-converter")({
  component: CaseConverterPage,
});
