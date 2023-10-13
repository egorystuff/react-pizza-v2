import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartState, ItemsType } from "./types";

const cartData = getCartFromLS();

const initialState: CartState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
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
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem: (state, action: PayloadAction<ItemsType>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);
    },

    romoveItem: (state, action: PayloadAction<ItemsType>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, minusItem, romoveItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
