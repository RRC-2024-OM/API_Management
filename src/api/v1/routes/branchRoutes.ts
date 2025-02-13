import { Router } from "express";
import { ValidationError as JoiValidationError } from 'joi';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from "../controllers/branchController";
import { createBranchSchema, updateBranchSchema } from "../schemas/branch.schema";
import { validateRequest } from "../middleware/validate.middleware";
import { AppError, ValidationError, AuthError } from "../middleware/errorHandler.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Branch Management
 *   description: API endpoints for managing branches
 */

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post('/', validateRequest(createBranchSchema), createBranch);

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch Management]
 *     responses:
 *       200:
 *         description: List of branches
 */
router.get("/", getAllBranches);

// ------------------------------------------------------------------
// Test route for error handling 
// ------------------------------------------------------------------
router.get('/test-error/:errorType', (req, res, next) => {
    const errorType = req.params.errorType;

    if (errorType === 'validation') {
        next(new ValidationError('Test validation error from test-error route'));
    } else if (errorType === 'auth') {
        next(new AuthError('Test authentication error from test-error route'));
    } else if (errorType === 'app') {
        next(new AppError('Test application error from test-error route', 503));
    } else if (errorType === 'joi') {
        const joiError = new JoiValidationError('"testParam" is required for test-error route', [{
            message: '"testParam" is required for test-error route',
            path: ['testParam'],
            type: 'any.required',
            context: { key: 'testParam', label: 'testParam' }
        }], undefined);
        next(joiError);
    } else if (errorType === 'generic') {
        next(new Error('Generic error from test-error route'));
    } else {
        res.status(200).send('Test endpoint - no error thrown'); // Default success
    }
});

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branch Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch found
 *       404:
 *         description: Branch not found
 */
router.get("/:id", getBranchById);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch
 *     tags: [Branch Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # You should list the properties that can be updated here.
 *             # For example:
 *             # properties:
 *             #   name:
 *             #     type: string
 *             #   address:
 *             #     type: string
 *             #   phone:
 *             #     type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 */
router.put("/:id", validateRequest(updateBranchSchema), updateBranch);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branch Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
router.delete("/:id", deleteBranch); 

export default router;