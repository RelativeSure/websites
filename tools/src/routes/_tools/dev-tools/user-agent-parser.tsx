import { createFileRoute } from "@tanstack/react-router";
import UserAgentParserPage from "../../../pages/tools/dev-tools/UserAgentParserPage";

export const Route = createFileRoute("/_tools/dev-tools/user-agent-parser")({
  component: UserAgentParserPage,
});
