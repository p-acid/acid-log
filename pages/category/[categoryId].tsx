import { differenceInDays } from "date-fns";
import Head from "next/head";

import CategoryMain from "../../container/pages/CategoryMain/CategoryMain";

import { Post } from "../../interface/CommonTypes";
import { CATEGORIES } from "../../lib/config/postConfig";

import { getAllPosts, getCategoryPaths } from "../../utils/post";

const Category = (props: any) => {
  return (
    <>
      <Head>
        <title>Acidlog | Category</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
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
