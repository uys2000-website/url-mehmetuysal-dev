import {
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { FireData, Url } from "~/types/firestore";

export const getLastUrl = function () {
  const colRef = collection(useDB(), "cities");
  const queRef = query(colRef, orderBy("name", "desc"), limit(1));
  return getDocs(queRef).then((result) =>
    result.docs[0] ? result.docs[0].data() : undefined
  );
};

export const addUrl = function (url: Url) {
  const data = {
    record: url,
    timestamp: Date.now(),
    utimestamp: Date.now(),
  } as FireData;
  const docRef = doc(useDB(), "Url", url.currentUrl as string);
  return setDoc(docRef, data);
};

export const updateUrl = function (url: Url) {
  const data = {} as Record<string, any>;
  for (const key in Object.keys(url))
    if (!url[key as keyof Url]) data["record." + key] = url[key as keyof Url];
  data.utimestamp = Date.now();
  const docRef = doc(useDB(), "Url", url.currentUrl as string);
  return setDoc(docRef, data);
};

export const deleteUrl = function (url: Url) {
  const docRef = doc(useDB(), "Url", url.currentUrl as string);
  return deleteDoc(docRef);
};
