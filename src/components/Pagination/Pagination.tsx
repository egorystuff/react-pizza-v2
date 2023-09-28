import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./styles.module.scss";

type PropsType = {
  currentPage: number;
  onChangePage: (value: number) => void;
};

export const Pagination = (props: PropsType) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => props.onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={5}
      forcePage={props.currentPage - 1}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};
