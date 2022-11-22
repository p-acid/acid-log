import { HTMLAttributes } from "react";

import PostItem from "../PostItem/PostItem";

import { ListBox, ListTitle, ListWrapper } from "../../common/commonStyle";

import { Post } from "../../../interface/CommonTypes";

interface PostListProps extends HTMLAttributes<HTMLDivElement> {
  posts: Post[];
  title?: string;
}

const PostList = ({ posts, title, ...restProps }: PostListProps) => {
  return (
    <ListWrapper id="main-posts" {...restProps}>
      {title && <ListTitle>{title}</ListTitle>}
      <ListBox>
        {posts.map((post, index) => (
          <PostItem key={post.id} index={index} {...post} />
        ))}
      </ListBox>
    </ListWrapper>
  );
};

export default PostList;
