export const formatBackendDate = (datetimeStr) => {
  if (!datetimeStr) return "";
  return datetimeStr.replace("T", " ");
};
