import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { Url } from "@/types/url";

export const createUrl = function (id: string, url: Url) {
  const _url = { ...url };
  _url.timestamp = Date.now();
  _url.utimestamp = Date.now();
  const docRef = doc(useUrlDatabase(), "Url", id);
  return setDoc(docRef, _url);
};
export const updateUrl = function (id: string, url: Url) {
  const _url = { ...url };
  _url.utimestamp = Date.now();

  const docRef = doc(useUrlDatabase(), "Url", id);
  return updateDoc(docRef, _url);
};

export const getUrls = function (
  uID: string,
  startTimestamp?: number,
  toForward: boolean = true
) {
  const colRef = collection(useUrlDatabase(), "Url");
  const startPoint = startTimestamp ? [startAfter(startTimestamp)] : [];
  const q = query(
    colRef,
    orderBy("timestamp", toForward ? "asc" : "desc"),
    where("urlOwner", "==", uID),
    limit(7),
    ...startPoint
  );
  return getDocs(q).then((res) => res.docs.map((res) => res.data()));
};

export const deleteUrl = function (uID: string) {
  const docRef = doc(useUrlDatabase(), "Url", uID);
  return deleteDoc(docRef);
};
