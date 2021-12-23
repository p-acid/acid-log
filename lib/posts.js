import fs from "fs"; // 자바스크립트의 파일 시스템 라이브러리
import path from "path"; // 자바스크립트의 디렉토리 및 파일 경로 작업 라이브러리
import matter from "gray-matter"; // 마크다운 파일 리더 라이브러리

// postsDirectory 경로 찾기
const postsDirectory = path.join(process.cwd(), "posts");
// path.join(): 여러 경로를 하나의 경로로 결합하는 메서드
// process.cwd(): 현재 작업 디렉토리 반환(node 명령을 호출한 디렉토리).
// 위 경우 현재_작업_디렉토리/posts 로 반환

export function getSortedPostsData() {
  // /posts 디렉토리의 파일 이름 읽어오기
  const fileNames = fs.readdirSync(postsDirectory);
  // readdirSync(dirName, [option]): dirName에 [option]을 적용하여 디렉토리 내 모든 파일 이름 또는 배열을 반환

  // 마크다운 파일 데이터 일괄 수정 by map method
  const allPostsData = fileNames.map((fileName) => {
    // id 값으로 사용할 파일 이름에서 ".md" 제거
    const id = fileName.replace(/\.md$/, "");

    // 마크다운 파일 문자열로 가져오기
    const fullPath = path.join(postsDirectory, fileName);
    // 해당 파일 경로 만들기 = 디렉토리_경로/파일_이름

    const fileContents = fs.readFileSync(fullPath, "utf8");
    // readFileSync(fileName, [option]): fileName에 [option]을 적용하여 문자열 반환

    // 마크다운 데이터(문자열) gray-matter 라이브러리로 해석
    const matterResult = matter(fileContents);

    // 데이터 결합
    return {
      id,
      ...matterResult.data,
    };
  });
  // 날짜 기준으로 정렬
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
