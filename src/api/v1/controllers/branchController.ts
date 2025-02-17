import { Request, Response } from "express";
import { BranchService } from "../services/branchService";
import { Branch } from "../models/branch";

export class BranchController {
  private branchService: BranchService;

  constructor(branchService: BranchService) {
    this.branchService = branchService;
    this.createBranch = this.createBranch.bind(this);
    this.getAllBranches = this.getAllBranches.bind(this);
    this.getBranchById = this.getBranchById.bind(this);
    this.updateBranch = this.updateBranch.bind(this);
    this.deleteBranch = this.deleteBranch.bind(this);
  }

  private handleError(error: unknown, res: Response, message: string) {
    console.error("Controller: Error caught:", error); // Log the caught error
    if (error instanceof Error) {
      res.status(500).json({ message, error: error.message, stack: error.stack }); // Include stack trace for debugging
    } else {
      res.status(500).json({ message, error: "An unknown error occurred" });
    }
  }

  async createBranch(req: Request, res: Response): Promise<void> {
    try {
      console.log("Controller: Request body:", req.body);
      const branchData: Branch = req.body;

      // Validate branchData (example - customize as needed)
      if (!branchData.name || !branchData.address || !branchData.phone) {
        res.status(400).json({ message: "Name, address, and phone are required" });
        return;
      }

      const newBranch = await this.branchService.createBranch(branchData);
      res.status(201).json(newBranch);
    } catch (error) {
      console.error("Controller: Error in createBranch:", error);
      this.handleError(error, res, "Error creating branch");
    }
  }

  async getAllBranches(req: Request, res: Response): Promise<void> {
    try {
      console.log("Controller: Getting all branches");
      const branches = await this.branchService.getAllBranches();
      res.status(200).json(branches);
    } catch (error) {
      console.error("Controller: Error in getAllBranches:", error);
      this.handleError(error, res, "Error fetching branches");
    }
  }

  async getBranchById(req: Request, res: Response): Promise<void> {
    try {
      const branchId = req.params.id; // ID is already a string
      console.log("Controller: Getting branch by ID:", branchId);
      const branch = await this.branchService.getBranchById(branchId);
      if (branch) {
        res.status(200).json(branch);
      } else {
        res.status(404).json({ message: "Branch not found" });
      }
    } catch (error) {
      console.error("Controller: Error in getBranchById:", error);
      this.handleError(error, res, "Error fetching branch");
    }
  }

  async updateBranch(req: Request, res: Response): Promise<void> {
    try {
      const branchId = req.params.id; // ID is already a string
      const updatedData: Partial<Branch> = req.body;
      console.log("Controller: Updating branch:", branchId, updatedData);

      // Add validation for updatedData if needed

      const updatedBranch = await this.branchService.updateBranch(branchId, updatedData);
      if (updatedBranch) {
        res.status(200).json(updatedBranch);
      } else {
        res.status(404).json({ message: "Branch not found" });
      }
    } catch (error) {
      console.error("Controller: Error in updateBranch:", error);
      this.handleError(error, res, "Error updating branch");
    }
  }

  async deleteBranch(req: Request, res: Response): Promise<void> {
    try {
      const branchId = req.params.id; // ID is already a string
      console.log("Controller: Deleting branch:", branchId);
      const result = await this.branchService.deleteBranch(branchId);
      if (result) {
        res.status(200).json({ message: "Branch deleted successfully" });
      } else {
        res.status(404).json({ message: "Branch not found" });
      }
    } catch (error) {
      console.error("Controller: Error in deleteBranch:", error);
      this.handleError(error, res, "Error deleting branch");
    }
  }
}