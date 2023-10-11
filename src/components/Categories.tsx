import React from "react";

type PropsType = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

// initial array of categories-------------------------------------------
const arrayCatedories: Array<string> = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

export const Categories: React.FC<PropsType> = (props) => {
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
};
