import {
  GoogleAuthProvider,
  NextOrObserver,
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const returnFalse = () => new Promise((s, j) => j(false));
export const loginWithPopup = function () {
  const provider = new GoogleAuthProvider();
  return setPersistence(useMainAuth(), browserLocalPersistence).then(() => {
    return signInWithPopup(useMainAuth(), provider);
  });
};

export const loginWithRedirection = function () {
  const provider = new GoogleAuthProvider();
  return setPersistence(useMainAuth(), browserLocalPersistence).then(() => {
    return signInWithRedirect(useMainAuth(), provider);
  });
};

export const logout = function () {
  return signOut(useMainAuth());
};

export const getUser = function () {
  return useMainAuth().currentUser;
};

export const getUserId = function () {
  return useMainAuth().currentUser?.uid;
};

export const listenAuth = function (runFunction: NextOrObserver<User>) {
  return onAuthStateChanged(useMainAuth(), runFunction);
};

export const createAuth = function (index: string, password: string) {
  return createUserWithEmailAndPassword(
    useUrlAuth(),
    `${index}@mehmetuysal.dev`,
    `${index}:mehmetuysal.dev;${password},`
  );
};
export const getUserToken = function () {
  const user = useMainAuth().currentUser;
  if (user) return user?.getIdToken(true);
  else return returnFalse();
};

export const updateAuth = async function (index: string, password: string) {
  const token = await getUserToken();
  if (token) {
    await useFetch("/api/auth", {
      method: "POST",
      body: {
        token: token,
        index: index,
        p: `${index}:mehmetuysal.dev;${password},`,
      },
    });
    return true;
  } else return returnFalse();
};
