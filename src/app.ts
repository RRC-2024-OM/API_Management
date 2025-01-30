import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import healthRoutes from "./api/v1/routes/health"; // Import health route

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "A simple Express API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000", // Base URL for your API
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"], // Path to your route files for API documentation
};

const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the health routes
app.use("/api/v1", healthRoutes);  // Use the health routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
