export type ItemsType = {
  id: number;
  imageUrl: string;
  title: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
};
export interface CartState {
  totalPrice: number;
  items: ItemsType[];
}
