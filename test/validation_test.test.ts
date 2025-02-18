import request from "supertest";
import express from "express";
import employeeRouter from "../src/api/v1/routes/employeeRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1/employees", employeeRouter);

describe("Employee Validation API", () => {
    it("should return validation errors for missing required fields", async () => {
        const invalidEmployee = {};

        const response = await request(app).post("/api/v1/employees").send(invalidEmployee);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Validation error"); 
        expect(response.body.error).toContain("Name is required"); 
        expect(response.body.error).toContain("Position is required");
        expect(response.body.error).toContain("Department is required");
        expect(response.body.error).toContain("Email is required");
        expect(response.body.error).toContain("Phone is required"); 
        expect(response.body.error).toContain("Branch ID is required");
    });

    it("should return validation error for invalid email format", async () => {
        const invalidEmployee = {
            name: "John Doe",
            position: "Developer",
            department: "IT",
            email: "invalid-email",
            phone: "1234567890",
            branchId: 101,
        };

        const response = await request(app).post("/api/v1/employees").send(invalidEmployee);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Invalid email format."); 
    });

    it("should return validation error for an invalid phone number", async () => {
        const invalidEmployee = {
            name: "John Doe",
            position: "Developer",
            department: "IT",
            email: "john.doe@example.com",
            phone: "123",
            branchId: 101,
        };

        const response = await request(app).post("/api/v1/employees").send(invalidEmployee);

        expect(response.status).toBe(400); // Correct status code expectation is 400
        expect(response.body.error).toContain("Phone must be a valid phone number"); 
    });

    it("should return validation error for an invalid branch ID", async () => {
        const invalidEmployee = {
            name: "John Doe",
            position: "Developer",
            department: "IT",
            email: "john.doe@example.com",
            phone: "1234567890",
            branchId: "not-a-number",
        };

        const response = await request(app).post("/api/v1/employees").send(invalidEmployee);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Branch ID must be a number");
    });
});