import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../interfaces/branch";

const handleError = (error: unknown, res: Response, message: string) => {
    if (error instanceof Error) {
        res.status(500).json({ message, error: error.message });
  } else {
    res.status(500).json({ message, error: "An unknown error occurred" });
  }
};

export const createBranch = async (req: Request, res: Response): Promise<void> => {
    try {
      const branchData: Branch = req.body;
      const newBranch = await branchService.createBranch(branchData);
      res.status(201).json(newBranch);
    } catch (error) {
      console.error(error);
      handleError(error, res, "Error creating branch");
    }
  };