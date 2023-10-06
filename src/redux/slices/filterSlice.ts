import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  searchValue: "",
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },

    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sortType = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

//selectors
export const selectSort = (state: RootState) => state.filter.sortType;
export const selectFilterData = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
