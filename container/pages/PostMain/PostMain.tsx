import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import {
  PostDate,
  PostDescription,
  PostInfoWrapper,
  PostThumbnail,
  PostThumbnailMask,
  PostThumbnailWrapper,
  PostTitle,
  PostMainContent,
  PostMainContentWrapper,
} from "./PostMainStyle";

import { PostMainProps } from "../../containerType";
import SyntaxStyler from "./SyntaxStyler/SyntaxStyler";

import { URL } from "../../../lib/config/urlConfig";
import { getEachDate } from "../../../utils/date";

const PostMain = ({ postData }: PostMainProps) => {
  const { query } = useRouter();
  const { title, thumbnail, date, description, contentHtml } = postData;

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
      <PostMainContentWrapper>
        <PostMainContent>
          <ReactMarkdown
            children={contentHtml}
            components={SyntaxStyler as any}
          />
        </PostMainContent>
      </PostMainContentWrapper>
    </div>
  );
};

export default PostMain;
