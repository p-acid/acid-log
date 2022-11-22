import { ReactNode } from "react";

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string;
  index: number;
}

export interface Category {
  /**
   * 필터링의 기준이 되는 태그를 의미합니다.
   * tag의 값은 해당 객체의 키 값과 동일해야합니다.
   */
  tag: string;
  /**
   * 해당 카테고리의 제목을 의미합니다.
   * 이는 카드 컴포넌트와 카테고리 상세에서 보여집니다.
   */
  title: string;
  /**
   * 해당 카테고리의 썸네일을 의미합니다.
   * 이는 카드 컴포넌트와 카테고리 상세에서 보여집니다.
   */
  thumbnail: string;
  /**
   * 해당 카테고리의 색상 테마를 의미합니다..
   * 이는 카드 컴포넌트와 카테고리 상세에서 보여집니다.
   * 색상 목록은 테마로 제공되는 컬러들이 제공됩니다.
   */
  infoBackground:
    | "black"
    | "white"
    | "gray_blue"
    | "blue"
    | "orange"
    | "purple"
    | "red"
    | "yellow"
    | "green"
    | "teal_blue"
    | "pink"
    | "bronze"
    | "tiffany";
  /**
   * 해당 카테고리의 상세 설명을 의미합니다.
   * 이는 카테고리 상세에서 보여집니다.
   */
  description?: string;
  /**
   * 필터링 된 포스팅 id 목록을 의미합니다.
   * 포스팅 개수와 포스팅 목록을 보여주는데 활용됩니다.
   */
  postIdList?: string[];
}

/**
 * 추천 포스팅으로 지정할 포스팅의 id(파일명)을 의미합니다.
 */
export type RecommendPost = string;

export interface PostMeta extends Post {
  postId: string;
  contentHtml: string;
  tocHtml: string;
}

export interface Log {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export interface Option {
  label: ReactNode;
  value: string | number;
}
