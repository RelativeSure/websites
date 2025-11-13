import { createFileRoute } from "@tanstack/react-router";
import HttpMethodsPage from "../../../pages/tools/reference/HttpMethodsPage";

export const Route = createFileRoute("/_tools/reference/http-methods")({
  component: HttpMethodsPage,
});
