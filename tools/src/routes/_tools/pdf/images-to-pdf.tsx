import { createFileRoute } from "@tanstack/react-router";
import ImagesToPdfPage from "../../../pages/tools/pdf/ImagesToPdfPage";

export const Route = createFileRoute("/_tools/pdf/images-to-pdf")({
  component: ImagesToPdfPage,
});
