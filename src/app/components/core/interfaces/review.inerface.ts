import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Review {
  id: number;
  productId: number;
  userId: number;
  body: string;
  stars: number;

}
