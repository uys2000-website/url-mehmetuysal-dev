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

export const delteUrlsToClean = async function () {
  const timestamp = new Date(new Date().getFullYear(), 0, 0).getTime();
  const target = firestoreUrl
    .collection("Url")
    .where("utimestamp", "<", timestamp);
  const count = await target.count().get();
  const snapshot = await target.get();
  let successCount = 0;
  for (let index = 0; index < snapshot.docs.length; index++) {
    await firestoreUrl.collection("Url").doc(snapshot.docs[index].id).delete();
    successCount += 1;
  }
  return { totalCount: count.data().count, successCount: successCount };
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
