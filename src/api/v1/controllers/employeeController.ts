import * as employeeService from "../services/employeeService";
import { Employee } from "../interfaces/employee";

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeData: Employee = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};