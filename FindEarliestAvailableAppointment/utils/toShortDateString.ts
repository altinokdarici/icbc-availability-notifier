export const toShortDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};
