import { createFileRoute } from "@tanstack/react-router";
import RandomDataPage from "../../../pages/tools/generators/RandomDataPage";

export const Route = createFileRoute("/_tools/generators/random-data")({
  component: RandomDataPage,
});
