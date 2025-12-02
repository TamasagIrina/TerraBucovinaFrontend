import { Category } from "./category.interface";

export interface Product {
  id: number;
  name: string;
  price: number;            
  shortDesc: string;
  longDesc: string;
  notification: string;
  ingredients: string;
  scientificStudies: string;
  stockQty: number;
  mainImageUrl: string | null; 
  createdAt: string;
  updatedAt: string;
  categories: Category | null; 

}
