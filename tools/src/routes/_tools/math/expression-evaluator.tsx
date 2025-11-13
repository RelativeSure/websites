import { createFileRoute } from "@tanstack/react-router";
import ExpressionEvaluatorPage from "../../../pages/tools/math/ExpressionEvaluatorPage";

export const Route = createFileRoute("/_tools/math/expression-evaluator")({
  component: ExpressionEvaluatorPage,
});
