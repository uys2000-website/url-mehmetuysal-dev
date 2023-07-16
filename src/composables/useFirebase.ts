import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import mainKey from "~/keys/firebase/main"
import urlKey from "~/keys/firebase/url"

let mainApp: undefined | FirebaseApp;
let mainAnalytics: undefined | Analytics;
let mainAuth: undefined | Auth;

let urlApp: undefined | FirebaseApp;
let urlAnalytics: undefined | Analytics;
let urlAuth: undefined | Auth;
let urlDatabase: undefined | Firestore;
let urlStorage: undefined | FirebaseStorage;

export const useMainApp = function () {
  if (!mainApp) mainApp = initializeApp(mainKey);
  return mainApp;
};

export const useMainAnalytics = function () {
  if (!mainAnalytics) mainAnalytics = getAnalytics(useMainApp());
  return mainAnalytics;
};

export const useMainAuth = function () {
  if (!mainAuth) mainAuth = getAuth(useMainApp());
  return mainAuth;
};

export const useUrlApp = function () {
  if (!urlApp) urlApp = initializeApp(urlKey);
  return urlApp;
};

export const useUrlAnalytics = function () {
  if (!urlAnalytics) urlAnalytics = getAnalytics(useUrlApp());
  return urlAnalytics;
};

export const useUrlAuth = function () {
  if (!urlAuth) urlAuth = getAuth(useUrlApp());
  return urlAuth;
};

export const useUrlDatabase = function () {
  if (!urlDatabase) urlDatabase = getFirestore(useUrlApp());
  return urlDatabase;
};

export const useUrlStorage = function () {
  if (!urlStorage) urlStorage = getStorage(useUrlApp());
  return urlStorage;
};