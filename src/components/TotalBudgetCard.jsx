import { UNCATEGORISED_BUDGET_ID } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

export default function TotalBudgetCard(props) {
  const { budgets, expenses } = useBudgets();
  const amount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const max = budgets.reduce(
    (total, budget) => total + budget.max,
    0
  );
  if (!amount) return null;
  return <BudgetCard amount={amount} max={max} name="Total" gray {...props} />;
}
