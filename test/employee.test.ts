/* eslint-disable */
import request from "supertest";
import app from "../src/app";

describe("Employee CRUD Operations", () => {
    let testBranchId: string;
    let testEmployeeId: string;

    // Create a test branch before running the tests
    beforeAll(async () => {
        const branchResponse = await request(app)
            .post("/api/v1/branches")
            .send({
                name: "Test Branch",
                address: "123 Test St, City, Country",
                phone: "123-456-7890",
            });
        testBranchId = branchResponse.body.id;
    });

    // Clean up test data after all tests are done
    afterAll(async () => {
        if (testEmployeeId) {
            await request(app).delete(`/api/v1/employees/${testEmployeeId}`);
        }
        if (testBranchId) {
            await request(app).delete(`/api/v1/branches/${testBranchId}`);
        }
    });

    it("should create a new employee", async () => {
        const response = await request(app)
            .post("/api/v1/employees")
            .send({
                name: "Test Employee",
                position: "Developer",
                department: "IT",
                email: "test.employee@example.com",
                phone: "123-456-7890",
                branchId: testBranchId, // Use the test branch ID
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test Employee");

        // Save the employee ID for later tests
        testEmployeeId = response.body.id;
    });

    it("should not create an employee with invalid data", async () => {
        const response = await request(app)
            .post("/api/v1/employees")
            .send({}); // Invalid data (empty object)
        expect(response.status).toBe(400);
    });

    it("should get all employees", async () => {
        const response = await request(app).get("/api/v1/employees");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should get a single employee by ID", async () => {
        const response = await request(app).get(`/api/v1/employees/${testEmployeeId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", testEmployeeId);
        expect(response.body.name).toBe("Test Employee");
    });

    it("should return 404 when employee ID does not exist", async () => {
        const response = await request(app).get("/api/v1/employees/99999"); // Non-existent ID
        expect(response.status).toBe(404);
    });

    it("should update an employee", async () => {
        const updatedEmployeeData = {
            position: "Senior Developer",
            phone: "987-654-3210",
        };

        const response = await request(app)
            .put(`/api/v1/employees/${testEmployeeId}`)
            .send(updatedEmployeeData);

        expect(response.status).toBe(200);
        expect(response.body.position).toBe("Senior Developer");
        expect(response.body.phone).toBe("987-654-3210");
    });

    it("should delete an employee", async () => {
        const response = await request(app).delete(`/api/v1/employees/${testEmployeeId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Employee deleted successfully");

        // Clear the employee ID after deletion
        testEmployeeId = "";
    });

    it("should get employees by branch ID", async () => {
        const response = await request(app).get(`/api/v1/employees/branch/${testBranchId}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should get employees by department", async () => {
        const response = await request(app).get("/api/v1/employees/department/IT");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});