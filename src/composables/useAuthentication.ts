import {
  GoogleAuthProvider,
  NextOrObserver,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

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

export const listenAuth = function (runFunction: NextOrObserver<User>) {
  return onAuthStateChanged(useMainAuth(), runFunction);
};
