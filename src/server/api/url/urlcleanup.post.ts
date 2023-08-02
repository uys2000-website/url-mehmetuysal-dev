export default defineEventHandler(async (event) => {
  const { token, timestamp } = await readBody(event);
  if (!token || !timestamp) return { success: false, reason: "request/error" };

  const key = process.env.CLEANUP_URLS_KEY;
  if (!key) return { success: false, reason: "server/error" };

  if (cyrb53(key, timestamp) != token)
    return { success: false, reaosn: "auth/error" };

  return await delteUrlsToClean();
});
