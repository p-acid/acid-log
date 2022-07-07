import { useRouter } from "next/router";
import { ROUTES } from "../../../lib/config/routeConfig";

const useCategoryItem = (tag: string) => {
  const { push } = useRouter();

  const goCategory = () => {
    push(`${ROUTES.CATEGORY}/${tag.toLowerCase()}`);
  };

  return { goCategory };
};

export default useCategoryItem;
