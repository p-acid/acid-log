import { ReactNode } from "react";
import { Log, Post, PostMeta } from "../interface/CommonTypes";

export interface HomeMainProps {
  posts: Post[];
}

export interface LayoutMainProps {
  children: ReactNode;
}

export interface PostMainProps {
  postData: PostMeta;
}

export interface LogMainProps {
  allLogs: Log[];
}
