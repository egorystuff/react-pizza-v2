import { ItemsType } from "../redux/cart/types";

export const calcTotalPrice = (items: ItemsType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
