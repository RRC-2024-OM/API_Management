import { Branch } from "../interfaces/branch";

let branches: Branch[] = [];
let branchIdCounter = 1;

export const createBranch = async (branchData: Branch): Promise<Branch> => {
    const newBranch: Branch = { id: branchIdCounter++, ...branchData };
    branches.push(newBranch);
    return newBranch;
  };

  export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
  };

  export const getBranchById = async (id: number): Promise<Branch | undefined> => {
    return branches.find(branch => branch.id === id);
  };
  