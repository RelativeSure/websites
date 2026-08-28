import { createFileRoute } from "@tanstack/react-router";
import PageNumbersPdfPage from "../../../pages/tools/pdf/PageNumbersPdfPage";

export const Route = createFileRoute("/_tools/pdf/page-numbers")({
  component: PageNumbersPdfPage,
});
