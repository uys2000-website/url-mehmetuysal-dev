import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const signWithGoogle = function () {
  const google = new GoogleAuthProvider();
  return signInWithPopup(useAuth(), google);
};

export const getUser = function () {
  return useAuth().currentUser;
};
