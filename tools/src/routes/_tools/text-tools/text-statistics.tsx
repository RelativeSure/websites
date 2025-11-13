import { createFileRoute } from "@tanstack/react-router";
import TextStatisticsPage from "../../../pages/tools/text-tools/TextStatisticsPage";

export const Route = createFileRoute("/_tools/text-tools/text-statistics")({
  component: TextStatisticsPage,
});
