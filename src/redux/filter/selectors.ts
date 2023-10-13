import { RootState } from "../store";

//selectors
export const selectSort = (state: RootState) => state.filter.sortType;
export const selectFilterData = (state: RootState) => state.filter;
