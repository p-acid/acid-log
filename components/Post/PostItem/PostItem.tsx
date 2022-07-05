import { Post } from "../../../interface/CommonTypes";
import { URL } from "../../../lib/config/urlConfig";

import {
  PostDescription,
  PostInfo,
  PostItemWrapper,
  PostThumbnail,
  PostTitle,
} from "./PostItemStyle";

const PostItem = ({ id, title, description, date, tags, thumbnail }: Post) => {
  return (
    <PostItemWrapper>
      <PostThumbnail
        src={`${URL.IMAGE}/${id}/${thumbnail}`}
        alt={`thumbnail-image-${title}`}
      />
      <PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostDescription>{description}</PostDescription>
      </PostInfo>
    </PostItemWrapper>
  );
};

export default PostItem;
