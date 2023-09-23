import React from "react";

import styles from "./styles.module.scss";
import { SearchPropsType } from "../Header";

export const Search = (props: SearchPropsType) => {
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
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>
      <input
        value={props.searchValue}
        onChange={(event) => props.setSearchValue(event.target.value)}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />

      {props.searchValue && (
        <svg
          onClick={() => props.setSearchValue("")}
          className={styles.clearIcon}
          width='800px'
          height='800px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M9 9L15 15' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
          <path d='M15 9L9 15' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
          <circle
            cx='12'
            cy='12'
            r='9'
            stroke='#000000'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      )}
    </div>
  );
};
