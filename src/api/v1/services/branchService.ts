import { Branch } from "../interfaces/branch";

let branches: Branch[] = [];
let branchIdCounter = 1;

export const createBranch = async (branchData: Branch): Promise<Branch> => {
    const newBranch: Branch = { id: branchIdCounter++, ...branchData };
    branches.push(newBranch);
    return newBranch;
  };