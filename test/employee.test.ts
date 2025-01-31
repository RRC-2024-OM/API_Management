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
        department: "Engineering",
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
});
