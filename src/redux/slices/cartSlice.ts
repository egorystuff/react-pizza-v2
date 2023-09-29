import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  categoryId: number;
}

const initialState: FilterState = {
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
