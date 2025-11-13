import { createFileRoute } from "@tanstack/react-router";
import HttpStatusPage from "../../../pages/tools/reference/HttpStatusPage";

export const Route = createFileRoute("/_tools/reference/http-status")({
  component: HttpStatusPage,
});
