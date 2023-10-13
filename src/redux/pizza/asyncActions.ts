import axios from "axios";
import { PizzaParams, PizzaType } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<PizzaType[], PizzaParams>("pizza/fetchPizzasByIdStatus", async (params) => {
  const { sortBy, order, category, search, currentPage } = params;

  const { data } = await axios.get<PizzaType[]>(
    `https://65060aa5ef808d3c66f0c4dc.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});
