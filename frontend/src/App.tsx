import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage/';
import { EmployeesListPage } from './pages/EmployeesListPage/EmployeesListPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='employee-list' element={<EmployeesListPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
