import { useEffect, useState } from 'react';
import { DataTable } from "../../components/DataTable"
import { ColumnHeader } from '../../components/DataTable/types';
import { getEmployees } from '../../services/getEmployees';
import { Employee } from '../../types';

export const EmployeesListPage = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployees()
      .then(employeesList => setEmployees(employeesList))
      .catch(err => console.error(err));
  }, []);

  const columns: ColumnHeader[] = [
    { headerName: "First Name", param: "firstname", type: 'string' },
    { headerName: "Last Name", param: "lastname", type: 'string' },
    { headerName: "Start Date", param: "startDate", type: 'date' },
    { headerName: "Department", param: "dpt", type: 'string' },
    { headerName: "Date of Birth", param: "birth", type: 'date' },
    { headerName: "Street", param: "street", type: 'string' },
    { headerName: "City", param: 'city', type: 'string' },
    { headerName: "State", param: 'state', type: 'string' },
    { headerName: "Zip Code", param: 'zipCode', type: 'string' },
  ];

  return (
    <>
      <h1>Current Employees</h1>
      <DataTable columns={columns} data={employees} />
    </>
  )
}