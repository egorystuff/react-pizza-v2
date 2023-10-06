import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import styles from "./styles.module.scss";
import { setSearchValue } from "../../redux/slices/filterSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // function for clearing input by clicking on the clear button
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 300),
    [],
  );

  // function to update local state and call deferred search function
  const onChangeInput = (event: { target: { value: string } }) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        width='800px'
        height='800px'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z'
          stroke='#000000'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />

      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          width='800px'
          height='800px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M9 9L15 15' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M15 9L9 15' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          <circle cx='12' cy='12' r='9' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      )}
    </div>
  );
};
