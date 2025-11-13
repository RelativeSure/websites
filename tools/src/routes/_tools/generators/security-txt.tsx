import { createFileRoute } from "@tanstack/react-router";
import SecurityTxtPage from "../../../pages/tools/generators/SecurityTxtPage";

export const Route = createFileRoute("/_tools/generators/security-txt")({
  component: SecurityTxtPage,
});
