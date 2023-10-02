import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../redux/slices/cartSlice";

type PropsType = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export function PizzaBlock(props: PropsType) {
  const dispatch = useDispatch();

  // pizza size selection filter----------------------------------------------
  const [pizzaSize, setPizzaSize] = useState<number>(0);

  // pizza type selection filter----------------------------------------------
  const arrPizzasTypes: Array<string> = ["Тонкое", "Традиционное"];
  const [pizzaType, setPizzaType] = useState<number>(0);

  const ocClickAdd = () => {
    const item = {
      id: props.id,
      imageUrl: props.imageUrl,
      title: props.title,
      types: pizzaType,
      sizes: pizzaSize,
      price: props.price,
    };
    dispatch(addItem(item));
  };

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <img className='pizza-block__image' src={props.imageUrl} alt={props.imageUrl} />
        <h4 className='pizza-block__title'>{props.title} </h4>
        <div className='pizza-block__selector'>
          <ul>
            {props.types.map((value: number, index: number, array: Array<number>) => (
              <li
                key={index}
                onClick={() => {
                  setPizzaType(index);
                }}
                className={pizzaType === index ? "active" : ""}>
                {arrPizzasTypes[value]}
              </li>
            ))}
          </ul>
          <ul>
            {props.sizes.map((value: number, index: number, array: Array<number>) => (
              <li
                key={index}
                onClick={() => {
                  setPizzaSize(index);
                }}
                className={pizzaSize === index ? "active" : ""}>
                {value} см.
              </li>
            ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>{props.price} ₽</div>
          <button onClick={ocClickAdd} className='button button--outline button--add'>
            <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            <i>0</i>
          </button>
        </div>
      </div>
    </div>
  );
}
