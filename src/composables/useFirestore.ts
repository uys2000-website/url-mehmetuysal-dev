import { doc, setDoc } from "firebase/firestore";
import { Url } from "@/types/url";

const db = useUrlDatabase();

export const createUrl = function (url: Url) {
  const _url = {
    ...url,
    timestamp: Date.now(),
  };

  const docRef = doc(db, "Urls", url.urlIndex.toString());
  return setDoc(docRef, _url);
};

export const updateUrl = function (url: Url) {};
