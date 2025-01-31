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

  export const updateBranch = async (id: number, updateData: Partial<Branch>): Promise<Branch | null> => {
    const branchIndex = branches.findIndex(branch => branch.id === id);
    if (branchIndex === -1) return null;
    
    branches[branchIndex] = { ...branches[branchIndex], ...updateData };
    return branches[branchIndex];
  };
  
  export const deleteBranch = async (id: number): Promise<boolean> => {
    const initialLength = branches.length;
    branches = branches.filter(branch => branch.id !== id);
    return branches.length < initialLength;
  };