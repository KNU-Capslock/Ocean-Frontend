import type { Cloth } from "./cloth.model";

export interface Post {
  id: number;
  title: string;
  content: string;
  imageSrc: string;
  createdAt: string;
  username: string;
  clothesList: Cloth[];
}
