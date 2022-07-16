import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import * as remarkHtml from "remark-html";

const logRoute = path.join(process.cwd(), "logs");

export const getAllLogs = async () => {
  const fileNames = fs.readdirSync(logRoute);

  const allLogsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(logRoute, fileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      const processedContent = await remark()
        .use(remarkHtml as any)
        .process(matterResult.content);

      const contentHtml = processedContent.toString();

      return {
        id,
        contentHtml,
        ...matterResult.data,
      };
    })
  );

  return allLogsData;
};
