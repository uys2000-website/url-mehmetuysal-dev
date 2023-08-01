import { authUrl, authMain } from "~/server/utils/firebase";

export const verifyMainUser = async function (token: string) {
  const user = await authMain.verifyIdToken(token);
  if (!user.uid) return undefined;
  return user;
};
export const verifyUrlUser = async function (token: string) {
  const user = await authUrl.verifyIdToken(token);
  if (!user.uid) return undefined;
  return user;
};

export const getMainUser = async function (mail: string) {
  try {
    const user = await authUrl.getUserByEmail(mail);
    if (!user.uid) return undefined;
    else return user;
  } catch {
    return undefined;
  }
};
export const getUrlUser = async function (index: string) {
  try {
    const user = await authUrl.getUserByEmail(`${index}@mehmetuysal.dev`);
    if (!user.uid) return undefined;
    else return user;
  } catch {
    return undefined;
  }
};

export const createUrlUser = async function (index: string, password: string) {
  return await authUrl.createUser({
    email: `${index}@mehmetuysal.dev`,
    password: password,
  });
};
export const updateUrlUser = async function (uid: string, password: string) {
  return await authUrl.updateUser(uid, { password: password });
};

export const deleteUrlUser = async function (index: string) {
  const user = await getUrlUser(index);
  if (!user) return true;
  await authUrl.deleteUser(user.uid as string);
  return true;
};
