import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
} as ServiceAccount;

console.log("Firebase Private Key:", serviceAccount.privateKey);
// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount),
});

// Get a reference to the Firestore service
const db: Firestore = getFirestore();

export { db };