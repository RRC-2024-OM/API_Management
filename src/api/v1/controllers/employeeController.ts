import { Request, Response } from "express";
import { createEmployee, getEmployees } from "../services/employeeService";

export const createEmployeeHandler = (req: Request, res: Response) => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;
    if (!name || !position || !department || !email || !phone || !branchId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const employee = createEmployee({ name, position, department, email, phone, branchId });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmployeesHandler = (req: Request, res: Response) => {
  try {
    const employees = getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
