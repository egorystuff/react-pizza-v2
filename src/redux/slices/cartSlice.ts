import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ItemsType = {
  id: number;
  imageUrl: string;
  title: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
};
interface CartState {
  totalPrice: number;
  items: ItemsType[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemsType>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action: PayloadAction<ItemsType>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) findItem.count--;
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    romoveItem: (state, action: PayloadAction<ItemsType>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

//selectors
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, minusItem, romoveItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
