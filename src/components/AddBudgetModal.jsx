import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handelClose}) {
    const nameRef = useRef();
    const maxRef = useRef();
    const {addBudget} = useBudgets();

    function handelSubmit(e){
        e.preventDefault();
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handelClose();
    }
  return (
    <Modal show={show} onHide={handelClose}>
        <Form onSubmit={handelSubmit}>
        <Modal.Header closeButton>
            <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="test" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="max">
                <Form.Label>Max Spending</Form.Label>
                <Form.Control ref={maxRef} type="number" required min={0} step={.01}/>
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Add</Button>
            </div>
        </Modal.Body>
        </Form>
    </Modal>
  )
}
