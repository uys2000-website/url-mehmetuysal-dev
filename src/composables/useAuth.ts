import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";

export const signWithGoogle = function () {
  const google = new GoogleAuthProvider();
  return signInWithPopup(useAuth(), google);
};

export const signWithApple = function () {
  const apple = new OAuthProvider("apple.com");
  return signInWithPopup(useAuth(), apple);
};
