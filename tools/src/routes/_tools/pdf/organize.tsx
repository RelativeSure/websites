import { createFileRoute } from "@tanstack/react-router";
import OrganizePdfPage from "../../../pages/tools/pdf/OrganizePdfPage";

export const Route = createFileRoute("/_tools/pdf/organize")({
  component: OrganizePdfPage,
});
