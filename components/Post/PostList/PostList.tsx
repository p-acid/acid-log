import { HTMLAttributes } from "react";

import PostItem from "../PostItem/PostItem";

import { PostListBox, PostListTitle, PostListWrapper } from "./PostListStyle";

import { Post } from "../../../interface/CommonTypes";

interface PostListProps extends HTMLAttributes<HTMLDivElement> {
  posts: Post[];
  title?: string;
}

const PostList = ({ posts, title, ...restProps }: PostListProps) => {
  return (
    <PostListWrapper {...restProps}>
      {title && <PostListTitle>{title}</PostListTitle>}
      <PostListBox>
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListBox>
    </PostListWrapper>
  );
};

export default PostList;
