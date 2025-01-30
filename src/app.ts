import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import employeeRoutes from "./api/v1/routes/employeeRoutes";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Directory API",
      version: "1.0.0",
      description: "API for managing employee data",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Employee Routes
app.use("/api/v1/employees", employeeRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
