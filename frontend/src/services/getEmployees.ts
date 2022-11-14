import { Employee } from "../types";

export async function getEmployees(): Promise<Employee[]> {
  let employees = [];
  try {
    const response = await (fetch(`${process.env.REACT_APP_API_URL}/employees-list`));
    employees = await response.json();
  } catch (e) {
    throw new Error("could not retrieve data");
  }
  return employees.data;
}