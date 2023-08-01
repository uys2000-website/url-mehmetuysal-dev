import { firestoreUrl } from "./firebase";
import { FieldValue } from "firebase-admin/firestore";
import { UrlData } from "~/types/url";

export const getLastUrlDoc = async function () {
  const docs = await firestoreUrl
    .collection("Url")
    .orderBy("timestamp", "desc")
    .limit(1)
    .get();
  const doc = docs.docs[0];
  if (doc.exists) return doc.data() as UrlData;
  else return undefined;
};

export const getUrlDoc = async function (index: string) {
  const doc = await firestoreUrl.doc(`Url/${index}`).get();
  if (doc.exists) return doc.data() as UrlData;
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

export const updateDoc = async function (index: string) {
  try {
    await firestoreUrl
      .doc(`Url/${index}`)
      .update({ urlUsage: FieldValue.increment(1) });
    return true;
  } catch {
    return false;
  }
};

export const afterUrlVisit = async function (index: string, doc: UrlData) {
  await updateDoc(index);
  if (doc.urlUsage + 1 >= doc.urlUsageLimit) await deleteUrlDoc(index);
};
