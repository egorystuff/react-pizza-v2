import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./styles.module.scss";

export const Pagination = (props: { onChangePage: (value: number) => void }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => props.onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};
