import { Branch } from "../models/branch";
import { FirebaseRepository } from "../repositories/firesbaseRepository";

export class BranchService {
  private firebaseRepository: FirebaseRepository;

  constructor(firebaseRepository: FirebaseRepository) {
    this.firebaseRepository = firebaseRepository;
  }

  async createBranch(branchData: Branch): Promise<Branch> {
    try {
      console.log("Service: Creating branch:", branchData);
      const newBranch = await this.firebaseRepository.createBranch(branchData);
      console.log("Service: Branch created:", newBranch);
      return newBranch;
    } catch (error) {
      console.error("Service: Error creating branch:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async getAllBranches(): Promise<Branch[]> {
    try {
      console.log("Service: Getting all branches");
      const branches = await this.firebaseRepository.getAllBranches();
      console.log("Service: Branches retrieved:", branches);
      return branches;
    } catch (error) {
      console.error("Service: Error getting all branches:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async getBranchById(id: string): Promise<Branch | undefined> {
    try {
      console.log("Service: Getting branch by ID:", id);
      const branch = await this.firebaseRepository.getBranchById(id);
      console.log("Service: Branch retrieved:", branch);
      return branch;
    } catch (error) {
      console.error("Service: Error getting branch by ID:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async updateBranch(id: string, updateData: Partial<Branch>): Promise<Branch | null> {
    try {
      console.log("Service: Updating branch:", id, updateData);
      const updatedBranch = await this.firebaseRepository.updateBranch(id, updateData);
      console.log("Service: Branch updated:", updatedBranch);
      return updatedBranch;
    } catch (error) {
      console.error("Service: Error updating branch:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async deleteBranch(id: string): Promise<boolean> {
    try {
      console.log("Service: Deleting branch:", id);
      const result = await this.firebaseRepository.deleteBranch(id);
      console.log("Service: Branch deleted:", result);
      return result;
    } catch (error) {
      console.error("Service: Error deleting branch:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }
}