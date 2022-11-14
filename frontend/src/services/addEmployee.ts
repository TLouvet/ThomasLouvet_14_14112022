import { Employee } from "../types";

export async function addEmployee(body: Employee): Promise<string> {

  let data = null;
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/new-employee`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    data = await res.json();
  } catch (e) {
    throw new Error("Adding a new employee failed")
  }

  return data?.message;
}