import './App.css';
import { Container } from 'react-bootstrap'
import AppNavbar from './components/AppNavbar'
import AppDataTable from './components/AppDataTable'

function App() {
  return (
    <div className="App">
      <h1>Bank Report</h1>
      <Container fluid>
        <AppNavbar />
        <div className="shadow mt-3 p-3">
          <AppDataTable />
        </div>
      </Container>
    </div>
  );
}

export default App;
