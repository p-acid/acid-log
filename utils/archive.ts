import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import * as remarkHtml from "remark-html";

const archiveRoute = path.join(process.cwd(), "archives");

export const getAllArchives = async () => {
  const fileNames = fs.readdirSync(archiveRoute);

  const allArchivesData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(archiveRoute, fileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      const processedContent = await remark()
        .use(remarkHtml as any)
        .process(matterResult.content);

      const contentHtml = processedContent.toString();

      return {
        id,
        contentHtml,
        ...(matterResult.data as { title: string }),
      };
    })
  );

  return allArchivesData;
};
