import { createFileRoute } from "@tanstack/react-router";
import WatermarkPdfPage from "../../../pages/tools/pdf/WatermarkPdfPage";

export const Route = createFileRoute("/_tools/pdf/watermark")({
  component: WatermarkPdfPage,
});
