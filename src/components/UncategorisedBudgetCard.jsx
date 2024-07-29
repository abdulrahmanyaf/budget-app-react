import { UNCATEGORISED_BUDGET_ID } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

export default function UncategorisedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORISED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (!amount) return null;
  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
}
