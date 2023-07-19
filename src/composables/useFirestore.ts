import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Url } from "@/types/url";

export const createUrl = function (id: string, url: Url) {
  const _url = {
    ...url,
    timestamp: Date.now(),
  };

  const docRef = doc(useUrlDatabase(), "Url", id);
  return setDoc(docRef, _url);
};

export const getUrls = function (uID: string) {
  const colRef = collection(useUrlDatabase(), "Url");
  const q = query(colRef, orderBy("timestamp"), where("urlOwner", "==", uID));
  return getDocs(q);
};
