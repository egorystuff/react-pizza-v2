import React from "react";
import "./scss/app.scss";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";
import pizzas from "./assets/pizzas.json";

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

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {pizzas.map((obj: PizzasType) => (
              <PizzaBlock imageUrl={obj.imageUrl} title={obj.title} price={obj.price} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
