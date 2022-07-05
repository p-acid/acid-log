import PostItem from "../PostItem/PostItem";

import { PostListBox, PostListTitle, PostListWrapper } from "./PostListStyle";

import { Post } from "../../../interface/CommonTypes";

interface PostListProps {
  posts: Post[];
  title: string;
}

const PostList = ({ posts, title }: PostListProps) => {
  return (
    <PostListWrapper>
      <PostListTitle>{title}</PostListTitle>
      <PostListBox>
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </PostListBox>
    </PostListWrapper>
  );
};

export default PostList;
