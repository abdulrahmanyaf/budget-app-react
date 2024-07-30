import { Button, Container, Stack } from "react-bootstrap";
import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorisedBudgetCard from "./components/UncategorisedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpenseModal from "./components/ViewExpenseModal";

function App() {
  const [showAddButtonModal, setShowAddButtonModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  // const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setShowAddButtonModalId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseButtonModalId] = useState();
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
                onViewExpenseClick={() => setViewExpenseButtonModalId(budget.id)}
              />
            );
          })}
          <UncategorisedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpenseButtonModalId(UNCATEGORISED_BUDGET_ID)}/>
          <TotalBudgetCard hideButtons/>
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
      <ViewExpenseModal
        budgetId= {viewExpenseModalBudgetId}
        handelClose={() => {
          setViewExpenseButtonModalId();
        }}
      />
    </>
  );
}

export default App;
