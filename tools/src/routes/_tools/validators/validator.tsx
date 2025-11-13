import { createFileRoute } from "@tanstack/react-router";
import ValidatorPage from "../../../pages/tools/validators/ValidatorPage";

export const Route = createFileRoute("/_tools/validators/validator")({
  component: ValidatorPage,
});
