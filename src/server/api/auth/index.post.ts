import { getUrlDoc } from "~/server/utils/firestore";
import {
  createUrlUser,
  getUrlUser,
  updateUrlUser,
  verifyMainUser,
} from "~/server/utils/authentication";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await verifyMainUser(body.token);
  if (!user) return { success: false };

  const doc = await getUrlDoc(body.index);
  if (!doc) return { success: false };

  if (doc.urlOwner != user.uid) return { success: false };

  const urlUser = await getUrlUser(body.index);
  if (!urlUser) await createUrlUser(body.index, body.p);
  else await updateUrlUser(urlUser.uid as string, body.p);

  return { success: true };
});
