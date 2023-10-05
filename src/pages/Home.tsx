import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useAppDispatch, type RootState } from "../redux/store";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false); //constant to wait for data to be received from the address bar
  const isMounted = useRef(false); //constant to determine the first render

  const { items } = useSelector((state: RootState) => state.pizza);

  // get data using redux-------------------------------------------------------------------------------------------------
  const { categoryId, sortType, currentPage } = useSelector((state: RootState) => state.filter);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // This is a function to request and receive data from the server
  const getPizzas = async () => {
    setIsLoading(true);

    // These are constants that are used to make a request to the server--------------------------------------------------
    const order: string = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy: string = sortType.sortProperty.replace("-", "");
    const category: string = categoryId > 0 ? `category=${categoryId}` : "";
    const search: string = searchValue ? `&search=${searchValue}` : "";

    try {
      dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      getPizzas();
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
