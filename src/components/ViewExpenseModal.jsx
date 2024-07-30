import { useRef } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import {
  UNCATEGORISED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpenseModal({
  handelClose,
  budgetId,
}) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } =
    useBudgets();
  const budget =
  budgetId === UNCATEGORISED_BUDGET_ID
      ? {
          name: "Uncategorized",
          id: UNCATEGORISED_BUDGET_ID,
        }
      : budgets.find((budget) => budget.id == budgetId);
  const expenses = getBudgetExpenses(budgetId);
  function handelSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handelClose();
  }
  return (
    <Modal show={budgetId != null} onHide={handelClose}>
      <Form onSubmit={handelSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap="2">
              <div>View {budget?.name} Expenses</div>
              {budgetId !== UNCATEGORISED_BUDGET_ID &&<Button
                variant="outline-danger"
                onClick={() => {deleteBudget(budgetId); handelClose();}}
              >
                Delete
              </Button>}
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="3">
            {expenses.map((expense) => {
              return (
                <Stack direction="horizontal" gap="2" key={expense.id}>
                  <div className="me-auto fs-4">{expense.description}</div>
                  <div className="fs-4">
                    {currencyFormatter.format(expense.amount)}
                  </div>
                  <Button
                    variant="outline-danger"
                    onClick={() => {deleteExpense(expense.id)} }
                    size="sm"
                  >
                    X
                  </Button>
                </Stack>
              );
            })}
          </Stack>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
