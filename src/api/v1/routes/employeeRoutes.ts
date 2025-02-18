import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate.middleware";
import { createEmployeeSchema, updateEmployeeSchema } from "../schemas/employee.schema";
import { EmployeeService } from "../services/employeeService"; 
import { FirebaseRepository } from "../repositories/firesbaseRepository";


const router = Router();
const firebaseRepository = new FirebaseRepository();
const employeeService = new EmployeeService(firebaseRepository); 
const employeeController = new EmployeeController(employeeService); 

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee with the provided details.
 *     tags:
 *       - Employee Management
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
router.post('/', validateRequest(createEmployeeSchema), employeeController.createEmployee.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     description: Returns a list of all employees.
 *     tags:
 *       - Employee Management
 *     responses:
 *       200:
 *         description: List of employees
 *       500:
 *         description: Internal server error
 */
router.get("/", employeeController.getAllEmployees.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     description: Returns the employee with the specified ID.
 *     tags:
 *       - Employee Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */
router.get("/:id", employeeController.getEmployeeById.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Updates an employee's details.
 *     tags:
 *       - Employee Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:  # List the updatable properties
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
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */
router.put('/:id', validateRequest(updateEmployeeSchema), employeeController.updateEmployee.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Deletes the employee with the specified ID.
 *     tags:
 *       - Employee Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", employeeController.deleteEmployee.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees/branch/{branchId}:
 *   get:
 *     summary: Get all employees for a branch
 *     description: Returns a list of employees that belong to a specific branch.
 *     tags:
 *       - Employee Management
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         description: Branch ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of employees
 *       404:
 *         description: Branch not found
 */
router.get("/branch/:branchId", employeeController.getEmployeesByBranch.bind(employeeController));

/**
 * @swagger
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Get all employees for a department
 *     description: Returns a list of employees that belong to a specific department.
 *     tags:
 *       - Employee Management
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         description: Department name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees
 *       404:
 *         description: Department not found
 */
router.get("/department/:department", employeeController.getEmployeesByDepartment.bind(employeeController));

export default router;