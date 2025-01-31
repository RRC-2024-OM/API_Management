import request from "supertest";
import app from "../src/app";

describe("Branch Management API", () => {
  let branchId: number; // To store branch ID for testing

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

  });
