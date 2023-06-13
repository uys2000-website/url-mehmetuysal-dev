import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const signWithGoogle = function () {
  const google = new GoogleAuthProvider();
  return signInWithPopup(useAuthMain(), google);
};

export const getUser = function () {
  return useAuthMain().currentUser;
};
