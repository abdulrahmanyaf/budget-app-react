import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UNCATEGORISED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";

export default function AddExpenseModal({ show, handelClose, defaultBudgetId}) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();
    const {budgets, addExpense} = useBudgets();

    function handelSubmit(e){
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        })
        handelClose();
    }
  return (
    <Modal show={show} onHide={handelClose}>
        <Form onSubmit={handelSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control ref={descriptionRef} type="text" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="max">
                <Form.Label>Amount</Form.Label>
                <Form.Control ref={amountRef} type="number" required min={0} step={.01}/>
            </Form.Group>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                <option value={UNCATEGORISED_BUDGET_ID}>Uncategorized</option>
                {budgets.map((budget) =>{
                    return <option key={budget.id} value={budget.id}>{budget.name}</option>
                })}
            </Form.Select>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Add</Button>
            </div>
        </Modal.Body>
        </Form>
    </Modal>
  )
}
