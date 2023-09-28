import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  categoryId: number;
  currentPage: number;
  sortType: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
