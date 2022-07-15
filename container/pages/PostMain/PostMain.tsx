import { useRouter } from "next/router";

import {
  PostDate,
  PostDescription,
  PostInfoWrapper,
  PostThumbnail,
  PostThumbnailMask,
  PostThumbnailWrapper,
  PostTitle,
} from "./PostMainStyle";

import { PostMainProps } from "../../containerType";

import { URL } from "../../../lib/config/urlConfig";
import { getEachDate } from "../../../utils/date";

const PostMain = ({ postData }: PostMainProps) => {
  const { query } = useRouter();
  const { title, thumbnail, date, description, tocHtml } = postData;

  const [year, month, day] = getEachDate(new Date(date));

  return (
    <div>
      <PostThumbnailWrapper>
        <PostThumbnailMask />
        <PostThumbnail
          src={`${URL.IMAGE.POSTS}/${query.postId}/${thumbnail}`}
        />
        <PostInfoWrapper>
          <PostTitle>{title}</PostTitle>
          <PostDescription>{description}</PostDescription>
          <PostDate>{`${year}년 ${month}월 ${day}일`}</PostDate>
        </PostInfoWrapper>
      </PostThumbnailWrapper>
      <div>{tocHtml}</div>
    </div>
  );
};

export default PostMain;
