import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectSort, setSortType } from "../redux/slices/filterSlice";

export type SortListType = {
  name: string;
  sortProperty: string;
};

export const sortList: SortListType[] = [
  { name: "популярности (убывание)", sortProperty: "rating" },
  { name: "популярности (возростание)", sortProperty: "-rating" },
  { name: "цене (убывание)", sortProperty: "price" },
  { name: "цене (возростание)", sortProperty: "-price" },
  { name: "алфавиту (убывание)", sortProperty: "title" },
  { name: "алфавиту (возростание)", sortProperty: "-title" },
];

export function Sort() {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  // logic for working the sort list--------------------------------------------------------------------------------------
  const sortType = useSelector(selectSort);

  // logic for working the sort list
  const [isSort, setIsSort] = useState<boolean>(false);

  const onClickSortList = (obj: SortListType) => {
    dispatch(setSortType(obj));
    setIsSort(false);
  };

  //this is a method for detecting a click on a body area and removing it if the sort component disappears from the page
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current !== null) {
        if (!event.composedPath().includes(sortRef.current)) {
          setIsSort(false);
        }
      }
    };

    document.body.addEventListener("click", handleClickOutside); // sort mount

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsSort(!isSort)}>{sortType.name}</span>
      </div>
      {isSort && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj: SortListType, index: number) => (
              <li
                key={index}
                onClick={() => {
                  onClickSortList(obj);
                }}
                className={sortType.sortProperty === obj.sortProperty ? "active" : ""}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
