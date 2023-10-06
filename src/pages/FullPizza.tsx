import React from "react";
import { useSelector } from "react-redux";
import { selectPizzaData } from "../redux/slices/pizzaSlice";

export const FullPizza = () => {
  const { items, status } = useSelector(selectPizzaData);

  return (
    <div>
      <h1>FullPizza</h1>
      <div className='pizza-block'>
        <img className='pizza-block__image' src={items[1].imageUrl} alt={items[1].imageUrl} />
      </div>
    </div>
  );
};
