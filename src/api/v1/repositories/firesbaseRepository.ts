import { Branch } from "../models/branch";
import { db } from "../../../../config/firebaseConfig";

export class FirebaseRepository {
  private branchesCollection = db.collection("branches");

    async createBranch(branchData: Omit<Branch, 'id'>): Promise<Branch> { 
        try {
          const newBranchRef = this.branchesCollection.doc(); // Firestore generates string ID
          const newBranch: Branch = { ...branchData, id: (await this.getNextBranchId()).toString() }; 
          await newBranchRef.set(newBranch);
          return newBranch;
        } catch (error) {
          throw new Error("Failed to create branch");
        }
      }

      async getNextBranchId(): Promise<number> {
        try {
            const counterRef = this.branchesCollection.doc('branch_counter');
            const counterDoc = await counterRef.get();
            let nextId = 1;

            if (counterDoc.exists) {
                const data = counterDoc.data();
                if (data) {
                    nextId = data.count + 1;
                }
            }

            await counterRef.set({ count: nextId }); // Update the counter document
            return nextId;
        } catch (error) {
            console.error("Error getting next branch id:", error)
            throw error;
        }
      }

      async getBranchById(id: string | number): Promise<Branch | undefined> { 
        try {
          let branchRef;
          if (typeof id === 'string') {
            branchRef = this.branchesCollection.doc(id); 
          } else {
            const querySnapshot = await this.branchesCollection.where("id", "==", id.toString()).get(); 
            if (querySnapshot.empty) return undefined; 
            branchRef = querySnapshot.docs[0].ref; 
          }
          const branchDoc = await branchRef.get();
          if (branchDoc.exists) {
            const branchData = branchDoc.data() as Branch;
            return branchData;
          }
          return undefined;
        } catch (error) {
          // ... error handling
          return undefined;
        }
      }

      async updateBranch(id: string | number, updateData: Partial<Branch>): Promise<Branch | null> { 
        try {
          const branch = await this.getBranchById(id);
          if (!branch) return null;
    
          let branchRef;
          if (typeof id === 'string') {
            branchRef = this.branchesCollection.doc(id); 
          } else {
            const querySnapshot = await this.branchesCollection.where("id", "==", id.toString()).get(); 
            if (querySnapshot.empty) return null; 
            branchRef = querySnapshot.docs[0].ref; 
          }
    
    
          await branchRef.update(updateData);
          return { ...branch, ...updateData }; 
        } catch (error) {
          return null;
        }
      }

      async deleteBranch(id: string | number): Promise<boolean> { 
        try {
          let branchRef;
          if (typeof id === 'string') {
            branchRef = this.branchesCollection.doc(id); 
          } else {
            const querySnapshot = await this.branchesCollection.where("id", "==", id.toString()).get(); 
            if (querySnapshot.empty) return false; 
            branchRef = querySnapshot.docs[0].ref; 
          }
    
          await branchRef.delete();
          return true;
        } catch (error) {
          return false;
        }
      }

      async getAllBranches(): Promise<Branch[]> {
        try {
          const snapshot = await this.branchesCollection.get();
          const branches: Branch[] = [];
          snapshot.forEach((doc) => {
            const branchData = doc.data() as Branch;
            if (branchData.id !== undefined) {
              branches.push({ id: branchData.id.toString(), ...branchData }); 
            }
          });
          return branches;
        } catch (error) {
          console.error("Repository: Error getting all branches:", error);
          throw error;
        }
      }
    }