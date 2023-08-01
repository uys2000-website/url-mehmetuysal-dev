import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import urlService from "~/server/keys/url";
import mainService from "~/server/keys/main";

export const url = initializeApp({ credential: cert(urlService) }, "url");

export const main = initializeApp({ credential: cert(mainService) }, "main");

export const firestoreUrl = getFirestore(url);
export const authUrl = getAuth(url);
export const authMain = getAuth(main);
