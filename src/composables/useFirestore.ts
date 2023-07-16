import { doc, setDoc } from "firebase/firestore";
import { Url } from "@/types/url";

const db = useUrlDatabase();

export const createUrl = function (id: string, url: Url) {
  const _url = {
    ...url,
    timestamp: Date.now(),
  };

  const docRef = doc(db, "Url", id);
  return setDoc(docRef, _url);
};
