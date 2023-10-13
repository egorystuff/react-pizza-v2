import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PizzaSliceState, PizzaType, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaType[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
