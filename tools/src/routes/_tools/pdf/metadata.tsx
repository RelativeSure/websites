import { createFileRoute } from "@tanstack/react-router";
import PdfMetadataPage from "../../../pages/tools/pdf/PdfMetadataPage";

export const Route = createFileRoute("/_tools/pdf/metadata")({
  component: PdfMetadataPage,
});
