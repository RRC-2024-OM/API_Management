import express from "express";
import { createEmployeeHandler, getEmployeesHandler } from "../controllers/employeeController";

const router = express.Router();

router.post("/employees", createEmployeeHandler);
router.get("/employees", getEmployeesHandler);

export default router;
