export interface Image{
    id:number;
    altText:string;
    imageUrl:string;
    isPrimary: boolean;
    sortOrder: number;
    productId:number;
}

/**
 * Read model returned by the backend (`ImageResponseDTO`). Owning product is
 * referenced by id only.
 */
export interface ImageResponse {
    id: number;
    productId: number | null;
    imageUrl: string;
    altText: string | null;
    sortOrder: number | null;
    isPrimary: boolean | null;
}
