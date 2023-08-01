import { Url } from "types/url";

import { firestoreUrl } from "./firebase";

export const getUrlDoc = async function (index: string) {
  const doc = await firestoreUrl.doc(`Url/${index}`).get();
  if (doc.exists) return doc.data() as Url;
  return undefined;
};

export const deleteUrlDoc = async function (index: string) {
  try {
    await firestoreUrl.doc(`Url/${index}`).delete();
    return true;
  } catch {
    return false;
  }
};
