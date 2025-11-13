import { createFileRoute } from "@tanstack/react-router";
import CsvJsonPage from "../../../pages/tools/converters/CsvJsonPage";

export const Route = createFileRoute("/_tools/converters/csv-json")({
  component: CsvJsonPage,
});
