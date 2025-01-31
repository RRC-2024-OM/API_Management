import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import employeeRoutes from "./api/v1/routes/employeeRoutes";

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee API",
      version: "1.0.0",
      description: "API for managing employees in the company",
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      {
        name: "Server Health Check",
        description: "API to check the server's health status",
      },
      {
        name: "Employee Management",
        description: "Operations related to managing employees",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/app.ts"], // Include only relevant files
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Employee routes
app.use("/api/v1/employees", employeeRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Server Health Check
 *     description: Check if the server is running.
 *     tags:
 *       - Server Health Check
 *     responses:
 *       200:
 *         description: Server is up and running
 *       500:
 *         description: Server error
 */
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Start server (only if not in test environment)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
