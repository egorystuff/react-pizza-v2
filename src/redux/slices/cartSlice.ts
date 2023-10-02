import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PizzasType } from "../../pages/Home";
import { stat } from "fs";

export interface ItemsType {
  id: number;
  imageUrl: string;
  title: string;
  types: string;
  sizes: number;
  price: number;
  count: number;
}
export interface CartState {
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
    // addItem: (state, action: PayloadAction<ItemsType>) => {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },

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

    romoveItem: (state, action) => {
      state.items = state.items.filter((obj) => obj !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, romoveItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
