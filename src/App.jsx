import { Button, Container, Stack } from "react-bootstrap";
import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorisedBudgetCard from "./components/UncategorisedBudgetCard";

function App() {
  const [showAddButtonModal, setShowAddButtonModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setShowAddButtonModalId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setShowAddButtonModalId(budgetId);
  }
  return (
    <>
      <Container className="my-5">
        <Stack gap="2" direction="horizontal" className="mb-2">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => setShowAddButtonModal(true)}>
            Add Budget
          </Button>
          <Button variant="primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
          <UncategorisedBudgetCard/>
        </div>
      </Container>
      <AddBudgetModal
        show={showAddButtonModal}
        handelClose={() => {
          setShowAddButtonModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handelClose={() => {
          setShowAddExpenseModal(false);
        }}
        defaultBudgetId= {addExpenseModalBudgetId}
      />
    </>
  );
}

export default App;
