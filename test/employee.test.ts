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

  });
      