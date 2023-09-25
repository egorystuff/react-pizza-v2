import React, { useContext, useEffect, useState } from "react";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort, SortListType } from "../components/Sort";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

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

  // pizza category selection filter----------------------------------------------
  const [categoryId, setCategoryId] = useState<number>(0);

  // logic for working the sort list----------------------------------------------
  const [sortType, setSortType] = useState<SortListType>({
    name: "популярности (убывание)",
    sortProperty: "rating",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  // logic for requesting data from the server, first rendering-------------------
  // and displaying the skeleton component----------------------------------------
  const [items, setItems] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect((): void => {
    setIsLoading(true);

    // These are constants that are used to make a request to the server
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const serch = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://65060aa5ef808d3c66f0c4dc.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${serch}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  // Below are the constants that are used for data rendering
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: PizzasType) => <PizzaBlock key={obj.id} {...obj} />);

  // This is a code variant for searching data in a static array, without asking the backend
  /*const pizzas = items
    .filter((obj: PizzasType) => {
      if (obj.title.toLowerCase().includes(props.searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: PizzasType) => <PizzaBlock key={obj.id} {...obj} />);
    */

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryId={categoryId}
          setCategoryId={(index) => {
            setCategoryId(index);
          }}
        />
        <Sort
          sortType={sortType}
          setSortType={(value) => {
            setSortType(value);
          }}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
