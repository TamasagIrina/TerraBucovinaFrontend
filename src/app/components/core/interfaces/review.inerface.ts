import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Review {
  id: number;
  productId: number;
  userId: number;
  body: string;
  stars: number;
  createdAt: string | null;

}

/**
 * Read model returned by the backend (`ReviewResponseDTO`). Product and user
 * are exposed as ids only.
 */
export interface ReviewResponse {
  id: number;
  productId: number | null;
  userId: number | null;
  body: string | null;
  stars: number;
  createdAt: string | null;
}

/**
 * Payload sent to the backend to submit a review (`ReviewRequestDTO`).
 */
export interface ReviewRequest {
  productId: number;
  userId: number;
  body?: string | null;
  stars: number;
}
