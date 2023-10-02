import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import type { RootState } from "../redux/store";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

export type PizzasType = {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false); //constant to wait for data to be received from the address bar
  const isMounted = useRef(false); //constant to determine the first render

  // get data using redux-------------------------------------------------------------------------------------------------
  const { categoryId, sortType, currentPage } = useSelector((state: RootState) => state.filter);

  // logic for requesting data from the server, first rendering and displaying the skeleton component---------------------
  const [items, setItems] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // This is a function to request and receive data from the server
  const fetchPizzas = () => {
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
  };

  // if some parameters were changed and there was a first render, then execute this code
  useEffect((): void => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  // check the URL parameters during the first render and save them in the REDUX
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // this hook is responsible for rendering pizzas
  useEffect((): void => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      fetchPizzas();
    }
  }, []);

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

      <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
};
