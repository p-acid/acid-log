import { Post } from "../../../interface/CommonTypes";

import { URL } from "../../../lib/config/urlConfig";

import {
  PostDate,
  PostDescription,
  PostInfo,
  PostItemWrapper,
  PostThumbnail,
  PostTitle,
} from "./PostItemStyle";
import usePostItem from "./usePostItem";

const PostItem = ({ id, title, description, date, thumbnail, index }: Post) => {
  const { goPost, combinedDate } = usePostItem(new Date(date));

  const isLazyload = index >= 2;

  return (
    <PostItemWrapper onClick={() => goPost(id)}>
      <PostThumbnail
        width={300}
        height={300}
        src={`${URL.IMAGE.POSTS}/${id}/${thumbnail}`}
        alt={`thumbnail-image-${title}`}
        loading={isLazyload ? "lazy" : "eager"}
      />
      <PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostDescription>{description}</PostDescription>
        <PostDate>{combinedDate}</PostDate>
      </PostInfo>
    </PostItemWrapper>
  );
};

export default PostItem;
