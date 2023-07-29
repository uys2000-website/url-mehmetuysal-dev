import { Url } from "~/types/url";

const responseBadRequest = function (event: any) {
  setResponseStatus(event, 400);
  return { hasError: true };
};

const returnDataAndUpdate = function (data: Url) {
  setTimeout(() => {
    const doc = firestore.doc(`Url/${getStringFromHex(data.urlIndex)}`);
    data.urlUsage++;
    if (data.urlUsage == data.urlUsageLimit) doc.delete();
    else doc.update(data as any);
  });

  let _data = { ...data };
  _data.urlUsage = 0;
  _data.urlUsageLimit = 0;
  return data;
};

export default defineEventHandler(async (event) => {
  const idString = event.context.params?.id;
  if (!idString) return responseBadRequest(event);

  const id = getHexFromString(idString);
  const query = firestore.doc(`Url/${getStringFromHex(id)}`);
  const doc = await query.get();
  if (!doc.exists) return responseBadRequest(event);

  return returnDataAndUpdate(doc.data() as Url);
});
