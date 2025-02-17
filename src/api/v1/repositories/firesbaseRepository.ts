import { Branch } from "../models/branch";
import { db } from "../../../../config/firebaseConfig";

export class FirebaseRepository {
  private branchesCollection = db.collection("branches");

  async createBranch(branchData: Branch): Promise<Branch> {
    try {
      const newBranchRef = this.branchesCollection.doc();
      const newBranch: Branch = { id: newBranchRef.id, ...branchData };
      console.log("Repository: Creating branch:", newBranch);
      await newBranchRef.set(newBranch);
      console.log("Repository: Branch created:", newBranch);
      return newBranch;
    } catch (error) {
      console.error("Repository: Error creating branch:", error);
      if (error instanceof Error) {
        console.error("Repository: Error message:", error.message);
        console.error("Repository: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async getAllBranches(): Promise<Branch[]> {
    try {
      const snapshot = await this.branchesCollection.get();
      const branches: Branch[] = [];
      snapshot.forEach((doc) => {
        const branchData = doc.data() as Branch;
        branches.push({ id: doc.id, ...branchData });
      });
      console.log("Repository: Retrieved all branches:", branches);
      return branches;
    } catch (error) {
      console.error("Repository: Error getting all branches:", error);
      if (error instanceof Error) {
        console.error("Repository: Error message:", error.message);
        console.error("Repository: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async getBranchById(id: string): Promise<Branch | undefined> {
    try {
      const branchSnapshot = await this.branchesCollection.doc(id).get();
      if (branchSnapshot.exists) {
        const branchData = branchSnapshot.data() as Branch;
        console.log("Repository: Retrieved branch by ID:", { id, branchData });
        return { id: branchSnapshot.id, ...branchData };
      }
      return undefined;
    } catch (error) {
      console.error("Repository: Error getting branch by ID:", error);
      if (error instanceof Error) {
        console.error("Repository: Error message:", error.message);
        console.error("Repository: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async updateBranch(id: string, updateData: Partial<Branch>): Promise<Branch | null> {
    try {
      const branchRef = this.branchesCollection.doc(id);
      const branchSnapshot = await branchRef.get();
      if (!branchSnapshot.exists) return null;

      const existingData = branchSnapshot.data() as Branch; // Get existing data
      const updatedBranch: Branch = { id, ...existingData, ...updateData }; // Merge existing and update data

      await branchRef.update(updateData); // Update only the provided data
      console.log("Repository: Updated branch:", updatedBranch);
      return updatedBranch;
    } catch (error) {
      console.error("Repository: Error updating branch:", error);
      if (error instanceof Error) {
        console.error("Repository: Error message:", error.message);
        console.error("Repository: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async deleteBranch(id: string): Promise<boolean> {
    try {
      const branchRef = this.branchesCollection.doc(id);
      const branchSnapshot = await branchRef.get();
      if (!branchSnapshot.exists) return false;

      await branchRef.delete();
      console.log("Repository: Deleted branch:", id);
      return true;
    } catch (error) {
      console.error("Repository: Error deleting branch:", error);
      if (error instanceof Error) {
        console.error("Repository: Error message:", error.message);
        console.error("Repository: Error stack:", error.stack);
      }
      throw error;
    }
  }
}