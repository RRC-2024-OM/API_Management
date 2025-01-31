import { Router } from "express";
import { createBranch } from "../controllers/branchController";

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
router.post("/", createBranch);

export default router;