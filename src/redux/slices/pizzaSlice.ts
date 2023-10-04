import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { userAPI } from "./userAPI";
import axios from "axios";

type ParamsType = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasByIdStatus", async (order: string) => {
  const response = await axios.get(
    `https://65060aa5ef808d3c66f0c4dc.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return response.data;
});

export interface ItemsType {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
export interface PizzaState {
  items: ItemsType[];
}

const initialState: PizzaState = {
  items: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      console.log("Sending...");
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log("Error...");
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;