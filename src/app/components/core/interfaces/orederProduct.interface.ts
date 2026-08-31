import { ProductResponse } from "./product.interface";

export interface OrderProduct {
  product: ProductResponse;
  quantity: number;
}