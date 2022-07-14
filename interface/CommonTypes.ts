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

export interface PostMeta {
  date: string;
  description: string;
  postId: string;
  tags: string[];
  thumbnail: string;
  title: string;
  contentHtml: string;
  tocHtml: string;
}
