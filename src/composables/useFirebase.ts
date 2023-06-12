// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

// for mehmetuysal.dev
let mainKey = {
  apiKey: "AIzaSyAp3eR8jWkx0ul-dL1n92omUc90yGgl8VM",
  authDomain: "mehmetuysal-dev.firebaseapp.com",
  projectId: "mehmetuysal-dev",
  storageBucket: "mehmetuysal-dev.appspot.com",
  messagingSenderId: "9412539083",
  appId: "1:9412539083:web:dea0ebc228ef1da7d0614e",
  measurementId: "G-E12Z77RY2K",
};

// for url.mehmetuysal.dev
let appKey = {
  apiKey: "AIzaSyDR0ZUa9Jr7Lc10E_Io0mHJg8pYJc4eehs",
  authDomain: "url-mehmetuysal-dev.firebaseapp.com",
  projectId: "url-mehmetuysal-dev",
  storageBucket: "url-mehmetuysal-dev.appspot.com",
  messagingSenderId: "57733275174",
  appId: "1:57733275174:web:2c8859d45f27e5e4d690e7",
  measurementId: "G-JRC94NFJ1K",
};

// for mehmetuysal.dev
let appMain: undefined | FirebaseApp = undefined;
let analyticsMain: undefined | Analytics = undefined;
let authMain: undefined | Auth = undefined;

// for url.mehmetuysal.dev
let app: undefined | FirebaseApp = undefined;
let analytics: undefined | Analytics = undefined;
let auth: undefined | Auth = undefined;
let db: undefined | Firestore = undefined;
let storage: undefined | FirebaseStorage = undefined;

// for mehmetuysal.dev
export const useMain = function () {
  if (!appMain) appMain = initializeApp(mainKey);
  return appMain;
};

export const useAnalyticsMain = function () {
  if (!analyticsMain) analyticsMain = getAnalytics(useMain());
  return analyticsMain;
};

export const useAuthMain = function () {
  if (!authMain) authMain = getAuth(useMain());
  return authMain;
};

// for url.mehmetuysal.dev
export const useApp = function () {
  if (!app) app = initializeApp(appKey);
  return appMain;
};

export const useAnalytics = function () {
  if (!analytics) analytics = getAnalytics(useApp());
  return analytics;
};

export const useAuth = function () {
  if (!auth) auth = getAuth(useApp());
  return auth;
};

export const useDB = function () {
  if (!db) db = getFirestore(useApp() as FirebaseApp);
  return db;
};

export const useStorage = function () {
  if (!storage) storage = getStorage(useApp());
  return storage;
};
