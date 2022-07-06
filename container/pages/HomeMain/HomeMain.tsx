import PostList from "../../../components/Post/PostList/PostList";
import { Post } from "../../../interface/CommonTypes";

interface HomeMainProps {
  posts: Post[];
}

const HomeMain = ({ posts }: HomeMainProps) => {
  return <PostList posts={posts} />;
};

export default HomeMain;
