import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as serviceAccount from "../api-management-318bc-firebase-adminsdk-fbsvc-09ead3cae2.json"

// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
const db: Firestore = getFirestore();

export { db };