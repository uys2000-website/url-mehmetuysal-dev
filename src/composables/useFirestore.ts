import {
  collection,
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
import { LUrlData, UrlData, UrlError } from "~/types/url";

export const createUrl = function (id: string, url: UrlData) {
  const _url = { ...url };
  _url.timestamp = Date.now();
  _url.utimestamp = Date.now();
  const docRef = doc(useUrlDatabase(), "Url", id);
  return setDoc(docRef, _url);
};
export const updateUrl = function (id: string, url: UrlData) {
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
export const deleteUrl = async function (index: string) {
  const token = await getUserToken();
  return await useLazyFetch(`/api/url/${index}/`, {
    method: "DELETE",
    body: { token: token },
  });
};
export const getUrl = async function (index: string) {
  const request = await useFetch(`/api/url/${index}`, { method: "GET" });
  await request.execute();
  return request.data.value as UrlData | UrlError;
};
export const getUrlLocked = async function (index: string, token: string) {
  const request = await useLazyFetch(`/api/url/${index}`, {
    method: "POST",
    body: { token: token },
  });
  return request.data.value as UrlData | UrlError;
};

export const getLastUrl = async function () {
  const request = await useLazyFetch("/api/url", { method: "GET" });
  return request.data.value as LUrlData;
};
