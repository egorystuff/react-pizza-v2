import React, { useEffect, useState } from "react";

import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Categories } from "../components/Categories";
import { Sort, SortListType } from "../components/Sort";

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
  // pizza category selection filter----------------------------------------------
  const [categoryId, setCategoryId] = useState<number>(0);

  // logic for working the sort list----------------------------------------------
  const [sortType, setSortType] = useState<SortListType>({
    name: "популярности (убывание)",
    sortProperty: "rating",
  });

  console.log(categoryId, sortType.sortProperty);

  // logic for requesting data from the server, first rendering-------------------
  // and displaying the skeleton component----------------------------------------
  const [items, setItems] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect((): void => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    fetch(`https://65060aa5ef808d3c66f0c4dc.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

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
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj: PizzasType) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
