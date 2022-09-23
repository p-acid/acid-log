import { Post } from "../../../interface/CommonTypes";

import { URL } from "../../../lib/config/urlConfig";
import Thumbnail from "../../common/Thumbnail/Thumbnail";

import {
  PostDate,
  PostDescription,
  PostInfo,
  PostItemWrapper,
  PostThumbnail,
  PostTitle,
} from "./PostItemStyle";
import usePostItem from "./usePostItem";

const PostItem = ({ id, title, description, date, thumbnail }: Post) => {
  const { goPost, combinedDate } = usePostItem(new Date(date));

  return (
    <PostItemWrapper onClick={() => goPost(id)}>
      <PostThumbnail
        src={`${URL.IMAGE.POSTS}/${id}/${thumbnail}`}
        alt={`thumbnail-image-${title}`}
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
