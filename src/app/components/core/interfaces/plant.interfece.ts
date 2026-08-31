import { Product } from "./product.interface";

/**
 * @deprecated Legacy shape carrying the full nested `product`. Being replaced
 * with {@link PlantResponse} (productId only) as features migrate.
 */
export interface Plant {
    id: number;
    shortDescription: string;
    longDescription: string;
    plantMessage:string;
    name:string;
    product: Product ;
    imageUrl:string;
}

/**
 * Read model returned by the backend (`PlantResponseDTO`). Owning product is
 * referenced by id only — no back-reference object.
 */
export interface PlantResponse {
    id: number;
    productId: number | null;
    name: string;
    imageUrl: string | null;
    shortDescription: string | null;
    longDescription: string | null;
    plantMessage: string | null;
}

/**
 * Payload sent to the backend to create a plant (`PlantRequestDTO`). The image
 * binary is uploaded separately as multipart; only metadata lives here.
 */
export interface PlantRequest {
    name: string;
    shortDescription?: string | null;
    longDescription?: string | null;
    plantMessage?: string | null;
    productId: number;
}
