/** Mirrors the backend ChatResponseDTO. */
export interface ChatProduct {
  id: number;
  name: string;
  price: number;
  mainImageUrl: string | null;
}

export interface ChatResponse {
  reply: string;
  products: ChatProduct[];
}
