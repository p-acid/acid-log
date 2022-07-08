import CategoryMain from "../../container/pages/CategoryMain/CategoryMain";
import { CATEGORIES } from "../../lib/config/postConfig";

import { getCategoryList } from "../../utils/post";

const Category = ({ categoryData }) => {
  console.log(categoryData);

  return <CategoryMain />;
};

export default Category;

export async function getStaticPaths() {
  const categoryList = getCategoryList();

  return {
    paths: categoryList,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const categoryData = CATEGORIES[params.category];
  return {
    props: {
      categoryData,
    },
  };
}
