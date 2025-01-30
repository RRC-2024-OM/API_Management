import { Employee } from "../interfaces/employee";

// Mock in-memory "database"
let employees: Employee[] = [];

export const createEmployee = async (employeeData: Employee): Promise<Employee> => {
  const newEmployee = { id: employees.length + 1, ...employeeData };
  employees.push(newEmployee);
  return newEmployee;
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  return employees;
};

export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
  return employees.find(employee => employee.id === id);
};