import {Router} from "express";
import { createEmployee, getAllEmployees } from "../controllers/employeeController";

const router = Router();

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", createEmployee); // Create employee

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     description: Returns a list of all employees in the directory.
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllEmployees); // Get all employees


export default router;