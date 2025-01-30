import { Employee } from "../interfaces/Employee";

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

export const updateEmployee = async (id: number, updatedData: Partial<Employee>): Promise<Employee | null> => {
  const employeeIndex = employees.findIndex(employee => employee.id === id);
  if (employeeIndex === -1) {
    return null;
  }
  const updatedEmployee = { ...employees[employeeIndex], ...updatedData };
  employees[employeeIndex] = updatedEmployee;
  return updatedEmployee;
};

export const deleteEmployee = async (id: number): Promise<boolean> => {
  const employeeIndex = employees.findIndex(employee => employee.id === id);
  if (employeeIndex === -1) {
    return false;
  }
  employees.splice(employeeIndex, 1);
  return true;
};
