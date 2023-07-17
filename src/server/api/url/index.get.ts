import { Url } from "~/types/url";
import { firestore } from "~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const query = firestore
    .collection("Url")
    .orderBy("timestamp", "desc")
    .limit(3);
  const data = await query.get();
  if (data.docs.length == 0) return { index: 0 };
  else {
    const url = data.docs[0].data() as Url;
    return { index: url.urlIndex };
  }
});
