import { Category } from "./category.interface";
import { ImageResponse } from "./image.interface";
import { PlantResponse } from "./plant.interfece";
import { ReviewResponse } from "./review.inerface";

/**
 * @deprecated Legacy shape that doubled as request/response. Being replaced,
 * feature by feature, with {@link ProductRequest} / {@link ProductResponse}
 * to match the backend DTO contract. Kept until every consumer is migrated.
 */
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

/**
 * Read model returned by the backend (`ProductResponseDTO`).
 * The parent category is flattened to id + name; child collections arrive as
 * slim nested response objects that never point back to the product.
 */
export interface ProductResponse {
  id: number;
  name: string;
  price: number;
  shortDesc: string | null;
  longDesc: string | null;
  notification: string | null;
  ingredients: string | null;
  scientificStudies: string | null;
  stockQty: number;
  active: boolean;
  mainImageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  categoryId: number | null;
  categoryName: string | null;
  plants: PlantResponse[];
  images: ImageResponse[];
  reviews: ReviewResponse[];
}

/**
 * Payload sent to the backend for create (POST) and update (PUT)
 * (`ProductRequestDTO`). Server-managed fields (id, timestamps) and child
 * collections are omitted; the category is referenced by id only.
 */
export interface ProductRequest {
  name: string;
  price: number;
  shortDesc?: string | null;
  longDesc?: string | null;
  notification?: string | null;
  ingredients?: string | null;
  scientificStudies?: string | null;
  stockQty: number;
  mainImageUrl?: string | null;
  categoryId: number;
}
