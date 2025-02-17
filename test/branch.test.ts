import request from "supertest";
import app from "../src/app";

describe("Branch Management API", () => {
  let branchId: string; // branchId is now a string

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
    branchId = response.body.id; // Assign the string ID
    expect(typeof branchId).toBe("string"); // Check if the id is a string
  });

  it("should retrieve all branches", async () => {
    const response = await request(app).get("/api/v1/branches");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Assert that each branch has a string ID
    response.body.forEach((branch: any) => {
      expect(typeof branch.id).toBe("string");
    });
  });

  it("should get branch by ID", async () => {
    const response = await request(app).get(`/api/v1/branches/${branchId}`); // Use the string ID
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", branchId); // Compare string IDs
  });

  it("should return 404 when branch ID does not exist", async () => {
    const response = await request(app).get(`/api/v1/branches/nonExistentId`); // Use a non-existent string ID
    expect(response.status).toBe(404);
  });

  it("should update branch details", async () => {
    const updatedBranchData = {
      name: "Updated Branch",
      address: "456 Updated St, New City, New Country",
      phone: "123-456-7891",
    };

    const response = await request(app)
      .put(`/api/v1/branches/${branchId}`) // Use the string ID
      .send(updatedBranchData);

    console.log("Update Branch Response:", response.status, response.body);

    expect(response.status).toBe(200);
    expect(response.body.address).toBe(updatedBranchData.address);
  });

  it("should delete a branch", async () => {
    const response = await request(app).delete(`/api/v1/branches/${branchId}`); // Use the string ID
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Branch deleted successfully" });
  });
});