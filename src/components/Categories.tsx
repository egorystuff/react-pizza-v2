import React, { useState } from "react";

type PropsType = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

export function Categories(props: PropsType) {
  // initial array of categories-------------------------------------------
  const arrayCatedories: Array<string> = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className='categories'>
      <ul>
        {arrayCatedories.map((value: string, index: number, array: Array<string>) => (
          <li
            key={index}
            onClick={() => {
              props.setCategoryId(index);
            }}
            className={props.categoryId === index ? "active" : ""}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
