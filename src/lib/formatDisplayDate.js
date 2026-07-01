export const formatDisplayDate = (datetimeStr) => {
  if (!datetimeStr) return "—";
  const normalized = datetimeStr.replace(" ", "T");
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
