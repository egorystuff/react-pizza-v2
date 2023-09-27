import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import type { RootState } from "../redux/store";
import { setCategoryId } from "../redux/slices/filterSlice";

type PizzasType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export const Home = () => {
  const { searchValue } = useContext(SearchContext);

  // get data using redux-------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const { categoryId, sortType } = useSelector((state: RootState) => state.filter);

  // this useState for pagination-----------------------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState<number>(1);

  // logic for requesting data from the server, first rendering and displaying the skeleton component---------------------
  const [items, setItems] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    setIsLoading(true);

    // These are constants that are used to make a request to the server--------------------------------------------------
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const serch = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://65060aa5ef808d3c66f0c4dc.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${serch}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  // Below are the constants that are used for data rendering-------------------------------------------------------------
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: PizzasType) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryId={categoryId}
          setCategoryId={(index) => {
            dispatch(setCategoryId(index));
          }}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
