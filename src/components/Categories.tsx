import React, { useState } from "react";

export function Categories() {
  // initial array of categories-------------------------------------------
  const arrayCatedories: Array<string> = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  // category selection filterы----------------------------------------------
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onClickCategory = (index: number): void => {
    setActiveIndex(index);
  };

  return (
    <div className='categories'>
      <ul>
        {arrayCatedories.map((value: string, index: number, array: Array<string>) => (
          <li
            onClick={() => {
              onClickCategory(index);
            }}
            className={activeIndex === index ? "active" : ""}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
