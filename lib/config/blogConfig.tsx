import { Category, RecommendPost } from "../../interface/CommonTypes";
import { ROUTES } from "./routeConfig";

export const NAVIGATION = {
  TITLE: {
    TEXT: (
      <span>
        <em>애시드.</em>로그
      </span>
    ),
    IMAGE: "main_logo.png",
  },
  MENU_LIST: [
    { label: "짧은 기록", url: ROUTES.LOG },
    { label: "아카이브", url: ROUTES.ARCHIVE },
    { label: "소개", url: ROUTES.ABOUT },
  ],
};

export const HOME = {
  ALL_POST: "전체 포스팅",
  CATEGORY: "카테고리 별",
  RECOMMEND_POST: "추천 포스팅",
};

export const LOG = {
  DESCRIPTION: "말 그대로 짧은 기록들을 담습니다",
};

export const RECOMMEND_POST_LIST: RecommendPost[] = [
  "react-patterns",
  "optimize-rerendering",
  "yarn-berry",
  "storybook-docs",
];

/**
 * 포스팅을 카테고리 별로 구분지어 묶는 기준을 의미합니다.
 */
export const CATEGORIES: { [key: string]: Category } = {
  blog: {
    tag: "blog",
    title: "커스텀 블로그",
    description:
      "아직도 개인 블로그가 없으시다구요? \n블로그를 직접 만들어보세요!",
    thumbnail: "blog_making.png",
    infoBackground: "blue",
  },
  svelte: {
    tag: "svelte",
    title: "스벨트 시리즈",
    description:
      "아직도 스벨트 맛을 못 봤다구요? \n리액트와는 다른 매력이 있는 스벨트를 공식 홈페이지 튜토리얼과 함께 진행해봅시다!",
    thumbnail: "svelte_logo.png",
    infoBackground: "orange",
  },
  "redux-toolkit": {
    tag: "redux-toolkit",
    title: "리덕스 툴킷 시리즈",
    description: "리덕스 툴킷 공식 홈페이지를 통해 기초를 다집니다.",
    thumbnail: "redux_logo.png",
    infoBackground: "purple",
  },
};

/**
 * 아카이브 내 정의사항들입니다.
 */
export const ARCHIVE = {
  category: {},
};
