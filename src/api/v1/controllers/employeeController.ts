import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../interfaces/employee";

// Helper function to handle unknown errors
const handleError = (error: unknown, res: Response, message: string) => {
  if (error instanceof Error) {
    res.status(500).json({ message, error: error.message });
  } else {
    res.status(500).json({ message, error: "An unknown error occurred" });
  }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeData: Employee = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error creating employee");
  }
};

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching employees");
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.id);
    const employee = await employeeService.getEmployeeById(employeeId);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching employee");
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.id);
    const updatedData: Partial<Employee> = req.body;
    const updatedEmployee = await employeeService.updateEmployee(employeeId, updatedData);
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error updating employee");
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.id);
    const result = await employeeService.deleteEmployee(employeeId);
    if (result) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error deleting employee");
  }
};
