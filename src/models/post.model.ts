import type { Cloth } from "./cloth.model";

export interface Post {
  id: number;
  title: string;
  content: string;
  image_src: string;
  created_at: string;
  username: string;
  clothes_list: Cloth[];
}
