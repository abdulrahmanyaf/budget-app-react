import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorge";
const BudgetsContext = React.createContext();

export const UNCATEGORISED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({children}) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function addBudget({name, max}) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidv4(), name, max }];
    });
  }

  function addExpense({description, amount, budgetId}) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }];
    });
  }

  function deleteBudget(budgetId) {
    setExpenses(prevExpenses => {
        return prevExpenses.map(expense => {
            if (expense.budgetId !== budgetId) return expense
            return {...expense, budgetId: UNCATEGORISED_BUDGET_ID}
        })
    })
    setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== budgetId)
    })
  }

  function deleteExpense(expenseId) {
    setExpenses(prevExpenses => {
        return prevExpenses.filter(expense => expense.id !== expenseId)
    })
  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }


  
  return (
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense
    }}>{children}</BudgetsContext.Provider>
  );
}
