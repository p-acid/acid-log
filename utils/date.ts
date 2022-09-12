export const getEachDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return [year, month + 1, day];
};

export const getLogTerm = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};

/**
 * 슬래쉬로 구분된 날짜 문자열을 한글 형태의 문자열로 변경하는 함수
 * @param slashTerm 슬래쉬(/)로 구분된 형식의 날짜 문자열
 */
export const parseTerm = (slashTerm: string) => {
  const [year, month] = slashTerm.split("/");

  return `${year}년 ${month}월`;
};
