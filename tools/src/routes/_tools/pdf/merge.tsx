import { createFileRoute } from "@tanstack/react-router";
import MergePdfPage from "../../../pages/tools/pdf/MergePdfPage";

export const Route = createFileRoute("/_tools/pdf/merge")({
  component: MergePdfPage,
});
