import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <>
      <Container className="my-5">
        <Stack gap='2' direction="horizontal" className="mb-2">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary">Add Budget</Button>
          <Button variant="primary">Add Expense</Button>
          </Stack>
          <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start'
          }}>
            <BudgetCard name="Entertainment" gray amount={1001} max={1000}/>
          </div>
      </Container>
    </>
  );
}

export default App;
