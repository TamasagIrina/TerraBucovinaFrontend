export interface CartItem {
  productId : number;
  quantity : number;
}

export interface CartItemDetailed extends CartItem {
  name : string;
  price : number;
  imageUrl : string;
  lineTotal : number;
}