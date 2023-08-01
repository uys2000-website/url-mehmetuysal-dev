import { deleteUrlUser, verifyMainUser } from "~/server/utils/authentication";
import { deleteUrlDoc, getUrlDoc } from "~/server/utils/firestore";

export default defineEventHandler(async (event) => {
  const index = event.context.params?.id;
  if (!index) return { success: false };

  const body = await readBody(event);
  if (!body.token) return { success: false };

  const user = await verifyMainUser(body.token);
  if (!user) return { success: false };

  const doc = await getUrlDoc(index);
  if (!doc) return { success: false };

  if (doc.urlOwner != user.uid) return { success: false };

  if (doc.urlLockOwner) {
    const deleteResult = await deleteUrlUser(index);
    if (!deleteResult) return { success: false };
  }

  const deleteResult = await deleteUrlDoc(index);
  if (!deleteResult) return { success: false };
  return { success: true };
});
