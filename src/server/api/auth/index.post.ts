import { Url } from "types/url";
import { authUrl, authMain, firestoreUrl } from "~/server/utils/firebase";

const createUrlUser = async function (index: string, password: string) {
  return await authUrl.createUser({
    email: `${index}@mehmetuysal.dev`,
    password: password,
  });
};
const updateUrlUser = async function (uid: string, password: string) {
  return await authUrl.updateUser(uid, { password: password });
};
const getUrlUser = async function (index: string) {
  return await authUrl.getUserByEmail(`${index}@mehmetuysal.dev`).catch(() => ({
    uid: false,
  }));
};

const getDoc = async function (index: string) {
  return await firestoreUrl.doc(`Url/${index}`).get();
};
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await authMain.verifyIdToken(body.token);
  if (!user?.uid) return { success: false };

  const doc = await getDoc(body.index);
  if (!doc.exists) return { success: false };

  const data = doc.data() as Url;
  if (data.urlOwner != user.uid) return { success: false };

  const urlUser = await getUrlUser(body.index);
  console.log(urlUser.uid);
  if (!urlUser.uid) await createUrlUser(body.index, body.p);
  else await updateUrlUser(urlUser.uid as string, body.p);
  return { success: true };
});
