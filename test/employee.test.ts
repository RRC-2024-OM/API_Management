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

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdEmployeeId = response.body.id;
    });

    it("should get all employees", async () => {
      const response = await request(app).get("/api/v1/employees");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should get a single employee by ID", async () => {
      const response = await request(app).get(`/api/v1/employees/${createdEmployeeId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", createdEmployeeId);
    });

    it("should update an employee", async () => {
      const response = await request(app)
        .put(`/api/v1/employees/${createdEmployeeId}`)
        .send({ position: "Senior Developer" });
  
      expect(response.status).toBe(200);
      expect(response.body.position).toBe("Senior Developer");
    });

  });
      