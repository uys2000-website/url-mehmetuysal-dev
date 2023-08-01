import { UrlData, UrlError } from "~/types/url";
export default defineEventHandler(async (event) => {
  let error = { success: false, isLocked: undefined } as UrlError;
  const id = event.context.params?.id;
  if (!id) return error;

  const index = getRecreatedIndex(id);
  if (!index) return error;

  const doc = await getUrlDoc(index);
  if (!doc) return error;

  if (!doc.urlLockOwner || doc.urlLockOwner == "anonymous") {
    runLater(afterUrlVisit, index, doc);
    return doc as UrlData;
  }
  error.isLocked = true;
  return error;
});
