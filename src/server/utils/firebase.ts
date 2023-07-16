import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "~/server/keys/url";

export const app = initializeApp({
  credential: cert(serviceAccount),
});

export const firestore = getFirestore();
