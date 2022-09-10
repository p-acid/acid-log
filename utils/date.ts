export const getEachDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return [year, month + 1, day];
};

export const getLogTerm = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};
