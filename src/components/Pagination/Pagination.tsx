import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./styles.module.scss";

// type PropsType = {
//   onChangePage: (value: number) => void;
// };

export const Pagination = (props: { onChangePage: (value: number) => void }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => console.log(event)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};
