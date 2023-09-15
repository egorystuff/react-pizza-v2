import React, { useState } from "react";

export function Categories() {
  // initial array of categories-------------------------------------------
  const arrayCatedories: Array<string> = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  // pizza category selection filter----------------------------------------------
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className='categories'>
      <ul>
        {arrayCatedories.map((value: string, index: number, array: Array<string>) => (
          <li
            key={index}
            onClick={() => {
              setActiveIndex(index);
            }}
            className={activeIndex === index ? "active" : ""}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
