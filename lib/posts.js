import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { remarkNormalizeHeadings } from "remark-normalize-headings";
import html from "remark-html";

const postsDirectory = () => path.join(process.cwd(), "posts");

export function getSortedPostsData(root) {
  const fileNames = fs.readdirSync(postsDirectory(root));

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory(root), fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
      d;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds(root) {
  const fileNames = fs.readdirSync(postsDirectory(root));

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id, root) {
  const fullPath = path.join(postsDirectory(root), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const processedToc = await remark()
    .use(remarkNormalizeHeadings)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  const tocHtml = processedToc.toString();

  return {
    id,
    contentHtml,
    tocHtml,
    ...matterResult.data,
  };
}
