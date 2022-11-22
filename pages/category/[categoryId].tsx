import { useRouter } from "next/router";
import { differenceInDays } from "date-fns";

import Helmet from "../../components/Helmet/Helmet";
import CategoryMain from "../../container/pages/CategoryMain/CategoryMain";

import { Post } from "../../interface/CommonTypes";

import { DOMAIN, URL } from "../../lib/config/urlConfig";
import { CATEGORIES } from "../../lib/config/blogConfig";

import { getAllPosts, getCategoryPaths } from "../../utils/post";
import { checkGif } from "../../utils/image";

const Category = (props: any) => {
  const { asPath } = useRouter();

  return (
    <>
      <Helmet
        title={`Acidlog | ${props.categoryData.title}`}
        description={props.categoryData.description}
        image={
          checkGif(props.categoryData.thumbnail)
            ? `${URL.IMAGE.BASE}/og_image.png`
            : `${URL.IMAGE.CATEGORY}/${props.categoryData.thumbnail}`
        }
        url={asPath ? `${DOMAIN}${asPath}` : DOMAIN}
      />
      <CategoryMain {...props} />
    </>
  );
};

export default Category;

export async function getStaticPaths() {
  const categoryList = getCategoryPaths();

  return {
    paths: categoryList,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPostsData = getAllPosts();
  const filteredPostList = allPostsData
    .filter((post: Post) => post.tags.includes(params.categoryId))
    .sort((a: Post, b: Post) =>
      differenceInDays(new Date(a.date), new Date(b.date))
    );
  const categoryData = CATEGORIES[params.categoryId];

  return {
    props: {
      filteredPostList,
      categoryData,
    },
  };
}
