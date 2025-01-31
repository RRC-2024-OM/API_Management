import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health Check
 *     description: Check if the server is running
 *     tags:
 *       - Server Health Check
 *     responses:
 *       200:
 *         description: Server is up and running
 *       500:
 *         description: Server error
 */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

export default router;
