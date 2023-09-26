import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  categoryId: number;
  sortType: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  sortType: {
    name: "популярности (убывание)",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },

    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
