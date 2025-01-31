import request from "supertest";
import app from "../src/app";

describe("Employee CRUD Operations", () => {
  let createdEmployeeId: number;

  it("should create a new employee", async () => {
    const response = await request(app)
      .post("/api/v1/employees")
      .send({
        name: "OP Server",
        position: "Developer",
        department: "IT",
        email: "OP.server@example.com",
        phone: "2048967452",
        branchId: 1,
      });

    console.log(response.body);  // Verify the response contains the created employee
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdEmployeeId = response.body.id;
  });

  it("should get all employees", async () => {
    const response = await request(app).get("/api/v1/employees");
    console.log(response.body);  // Verify the list of employees
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a single employee by ID", async () => {
    console.log(`Fetching employee with ID: ${createdEmployeeId}`);
    const response = await request(app).get(`/api/v1/employees/${createdEmployeeId}`);
    console.log(response.body);  // Verify the fetched employee
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", createdEmployeeId);
  });

  it("should update an employee", async () => {
    const response = await request(app)
      .put(`/api/v1/employees/${createdEmployeeId}`)
      .send({
        position: "Senior Developer",
      });

    console.log(response.body);  // Verify the updated employee
    expect(response.status).toBe(200);
    expect(response.body.position).toBe("Senior Developer");
  });

  it("should delete an employee", async () => {
    const response = await request(app).delete(`/api/v1/employees/${createdEmployeeId}`);
    console.log(response.body);  // Verify the deletion response
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Employee deleted successfully");
  });

  // New test: Get employees by branch ID
  it("should get employees by branch ID", async () => {
    const response = await request(app).get("/api/v1/employees/branch/1");
    console.log(response.body);  // Verify employees for branch 1
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);  // Expect some employees in branch 1
  });

  // New test: Get employees by department
  it('should get employees by department', async () => {
    // Ensure that the employee is created before querying
    const response = await request(app).get('/api/v1/employees/department/IT');
    console.log(response.body);  // Log the response for debugging

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);  // Expect at least one employee in the Engineering department
  });
});
