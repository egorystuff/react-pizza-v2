export type SortListType = {
  name: string;
  sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price";
};

export interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: SortListType;
}
