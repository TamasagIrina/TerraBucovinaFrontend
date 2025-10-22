export interface FavoriteItem {
  productId : number;
}

export interface FavoriteItemDetailed extends FavoriteItem {
  name : string;
  price : number;
  imageUrl : string;
}