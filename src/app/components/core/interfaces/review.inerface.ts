import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Review {
  id: number;
  product: Product | number; 
  user: User  | null; 
  title?: string;
  body: string;
  stars: number;
  createdAt: string;
}
