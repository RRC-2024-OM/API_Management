import request from "supertest";
import app from "../src/app";

describe("Branch Management API", () => {
  let branchId: number; 

// Create a new branch
  it("should create a new branch", async () => {
    const response = await request(app)
      .post("/api/v1/branches")
      .send({
        name: "Main Branch",
        address: "123 Main St, City, Country",
        phone: "+1234567890",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("Main Branch");
      branchId = response.body.id;
    });

// Get all branches
  it("should retrieve all branches", async () => {
    const response = await request(app).get("/api/v1/branches");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  });
