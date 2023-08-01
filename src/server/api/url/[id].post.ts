import { UrlData } from "~/types/url";
export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  if (!token) return { success: false, isLocked: undefined };

  const id = event.context.params?.id;
  if (!id) return { success: false, isLocked: undefined };

  const index = getRecreatedIndex(id);
  if (!index) return { success: false, isLocked: undefined };

  const doc = await getUrlDoc(index);
  if (!doc) return { success: false, isLocked: undefined };

  const orginalUser = await getUrlUser(index);
  if (!orginalUser) return { success: false, isLocked: false };

  const sendedUser = await verifyUrlUser(token);
  if (!sendedUser) return { success: false, isLocked: true };

  if (orginalUser.uid != sendedUser.uid)
    return { success: false, isLocked: true };
  console.log("inpost");
  runLater(afterUrlVisit, index, doc);
  return doc as UrlData;
});
