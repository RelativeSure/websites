import { createFileRoute } from "@tanstack/react-router";
import HttpHeadersPage from "../../../pages/tools/reference/HttpHeadersPage";

export const Route = createFileRoute("/_tools/reference/http-headers")({
  component: HttpHeadersPage,
});
