import { createFileRoute } from "@tanstack/react-router";
import SplitPdfPage from "../../../pages/tools/pdf/SplitPdfPage";

export const Route = createFileRoute("/_tools/pdf/split")({
  component: SplitPdfPage,
});
