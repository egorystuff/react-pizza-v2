import { RootState } from "../store";

//selectors
export const selectPizzaData = (state: RootState) => state.pizza;
