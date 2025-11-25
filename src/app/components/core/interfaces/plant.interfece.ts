import { Product } from "./product.interface";

export interface Plant {
    id: number;
    shortDescription: string;
    longDescription: string;
    plantMessage:string;
    name:string;
    product: Product ;
    imageUrl:string;
}