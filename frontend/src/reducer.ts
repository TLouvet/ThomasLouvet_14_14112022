import { Employee } from "./types";

export const initialState: Employee = {
  firstname: "",
  lastname: "",
  city: "",
  street: "",
  zipCode: "",
  birth: "",
  startDate: "",
  dpt: "",
  state: "",
};

export const init = () => {
  return initialState;
}

export enum EmployeeActionKind {
  LASTNAME = "LASTNAME",
  FIRSTNAME = 'FIRSTNAME',
  STREET = "STREET",
  CITY = 'CITY',
  ZIPCODE = "ZIPCODE",
  DEPARTMENT = "DEPARTMENT",
  STATE = "STATE",
  BIRTH = "BIRTH",
  START = "START",
  INIT = 'INIT',
}

export interface EmployeeAction {
  type: EmployeeActionKind;
  payload?: string;
}

export function employeeReducer(state: Employee, action: EmployeeAction): Employee {
  action.payload = String(action.payload);
  switch (action.type) {
    case 'FIRSTNAME':
      return { ...state, firstname: action.payload };
    case 'LASTNAME':
      return { ...state, lastname: action.payload };
    case 'STREET':
      return { ...state, street: action.payload };
    case 'CITY':
      return { ...state, city: action.payload };
    case 'ZIPCODE':
      return { ...state, zipCode: action.payload };
    case 'DEPARTMENT':
      return { ...state, dpt: action.payload };
    case 'STATE':
      return { ...state, state: action.payload };
    case 'BIRTH':
      return { ...state, birth: action.payload };
    case 'START':
      return { ...state, startDate: action.payload };
    case "INIT":
      return init();
    default:
      throw new Error();
  }
}