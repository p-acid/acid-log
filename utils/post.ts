import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import * as remarkHtml from "remark-html";
import remarkNormalizeHeadings from "remark-normalize-headings";

import { Category, Post, PostMeta } from "../interface/CommonTypes";

import { CATEGORIES } from "../lib/config/postConfig";

const postRoute = path.join(process.cwd(), "posts");

export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postRoute);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postRoute, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
};

export const getRecommendedPosts = (posts: Post[], filterList: string[]) => {
  return posts.filter(({ id }) => filterList.includes(id));
};

export const getCategoryPosts = (posts: Post[]): Category[] => {
  return Object.values(CATEGORIES).map(
    ({ tag, title, thumbnail, infoBackground }) => ({
      tag,
      title,
      thumbnail,
      infoBackground: infoBackground as Category["infoBackground"],
      postIdList: posts
        .filter(({ tags }) => tags.includes(tag))
        .map((post) => post.id),
    })
  );
};

export const getAllPostPaths = () => {
  const fileNames = fs.readdirSync(postRoute);

  return fileNames.map((fileName) => {
    return {
      params: {
        postId: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getCategoryPaths = () => {
  return Object.keys(CATEGORIES).map((categoryId) => ({
    params: {
      categoryId,
    },
  }));
};

export async function getPostData(postId) {
  const fullPath = path.join(postRoute, `${postId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);

  const processedToc = await remark()
    .use(remarkNormalizeHeadings)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  const tocHtml = processedToc.toString();

  return {
    postId,
    contentHtml,
    tocHtml,
    ...matterResult.data,
  };
}

function html(html: any) {
  throw new Error("Function not implemented.");
}
