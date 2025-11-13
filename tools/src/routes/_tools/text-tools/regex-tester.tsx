import { createFileRoute } from "@tanstack/react-router";
import RegexTesterPage from "../../../pages/tools/text-tools/RegexTesterPage";

export const Route = createFileRoute("/_tools/text-tools/regex-tester")({
  component: RegexTesterPage,
});
