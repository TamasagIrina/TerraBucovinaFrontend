import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Review {
  id: number;
   product: { id: number } | number;
  user: { id: number } | number;
  body: string;
  stars: number;

}
