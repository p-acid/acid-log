import { useRouter } from "next/router";

import { ROUTES } from "../../../lib/config/routeConfig";
import { getEachDate } from "../../../utils/date";

const usePostItem = (date: Date) => {
  const { push } = useRouter();
  const [year, month, day] = getEachDate(date);

  const combinedDate = `${year}년 ${month}월 ${day}일`;

  const goPost = (id: string) => {
    push(`${ROUTES.POSTS}/${id}`);
  };

  return { goPost, combinedDate };
};

export default usePostItem;
