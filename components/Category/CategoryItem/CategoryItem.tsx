import {
  CategoryInfoDate,
  CategoryInfoDescription,
  CategoryInfoTitle,
  CategoryItemInfo,
  CategoryItemThumbnail,
  CategoryItemWrapper,
} from "./CategoryItemStyle";
import { URL } from "../../../lib/config/urlConfig";
import { Post } from "../../../interface/CommonTypes";
import usePostItem from "../../Post/PostItem/usePostItem";

type CategoryItemProps = Post;

const CategoryItem = ({
  id,
  title,
  description,
  date,
  thumbnail,
}: CategoryItemProps) => {
  const { goPost, combinedDate } = usePostItem(new Date(date));

  return (
    <CategoryItemWrapper onClick={() => goPost(id)}>
      <CategoryItemInfo>
        <CategoryInfoTitle>{title}</CategoryInfoTitle>
        <CategoryInfoDescription>{description}</CategoryInfoDescription>
        <CategoryInfoDate>{combinedDate}</CategoryInfoDate>
      </CategoryItemInfo>
      <CategoryItemThumbnail
        src={`${URL.IMAGE.POSTS}/${id}/${thumbnail}`}
        alt={thumbnail}
      />
    </CategoryItemWrapper>
  );
};

export default CategoryItem;
