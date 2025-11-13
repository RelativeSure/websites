import { createFileRoute } from "@tanstack/react-router";
import BinaryCalculatorPage from "../../../pages/tools/math/BinaryCalculatorPage";

export const Route = createFileRoute("/_tools/math/binary-calculator")({
  component: BinaryCalculatorPage,
});
