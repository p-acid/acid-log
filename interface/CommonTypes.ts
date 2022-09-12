import { ReactNode } from "react";

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string;
}

export interface Category {
  tag: string;
  title: string;
  thumbnail: string;
  description?: string;
  postIdList: string[];
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
}

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
  value: string & number;
}
