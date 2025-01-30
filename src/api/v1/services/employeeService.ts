import { Employee } from "../interfaces/employee";
import { v4 as uuidv4 } from "uuid";

const employees: Employee[] = [];

export const createEmployee = (data: Omit<Employee, "id">): Employee => {
  const newEmployee: Employee = { id: uuidv4(), ...data };
  employees.push(newEmployee);
  return newEmployee;
};

export const getEmployees = (): Employee[] => {
  return employees;
};
