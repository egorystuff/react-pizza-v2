export type PizzaParams = Record<string, string>;
// type PizzaParams = {
//   order: string;
//   sortBy: string;
//   category: string;
//   search: string;
//   currentPage: string;
// };

export type PizzaType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: PizzaType[];
  status: Status;
}
