import { Page } from "../page/page.model";

export interface Book {
  _id:string
  title: string;
  author: string;
  dateCreated:string;
  pages:Page[]

}
