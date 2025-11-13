import { createFileRoute } from "@tanstack/react-router";
import PasswordGeneratorPage from "../../../pages/tools/generators/PasswordGeneratorPage";

export const Route = createFileRoute("/_tools/generators/password-generator")({
  component: PasswordGeneratorPage,
});
