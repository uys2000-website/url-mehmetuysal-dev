export default defineEventHandler(async (event) => {
  const doc = await getLastUrlDoc();
  if (!doc) return { index: 0 };
  return { index: doc.urlIndex };
});
